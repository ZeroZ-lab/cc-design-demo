import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

const buildingFloors = [
  { id: 'b1', label: 'B1', zone: '地下停车层', occupancy: 34, cameraOnline: 38, accessState: '受控', riskLevel: 'medium', alerts: 1, summary: '车辆出入密集，重点巡检消防通道与坡道门禁。' },
  { id: 'l1', label: 'L1', zone: '大堂中枢', occupancy: 81, cameraOnline: 24, accessState: '开放', riskLevel: 'low', alerts: 0, summary: '访客登记与闸机联动正常，主入口客流较高。' },
  { id: 'l2', label: 'L2', zone: '联合办公层', occupancy: 68, cameraOnline: 18, accessState: '开放', riskLevel: 'low', alerts: 0, summary: '办公区与茶水间热度均衡，无异常逗留。' },
  { id: 'l3', label: 'L3', zone: '会议中心', occupancy: 59, cameraOnline: 20, accessState: '关注', riskLevel: 'medium', alerts: 2, summary: '会议室集中占用，西侧通道出现短时人员滞留。' },
  { id: 'l4', label: 'L4', zone: '研发楼层', occupancy: 72, cameraOnline: 26, accessState: '受控', riskLevel: 'low', alerts: 0, summary: '受限门区状态稳定，访客路径未越界。' },
  { id: 'l5', label: 'L5', zone: '机房与弱电间', occupancy: 12, cameraOnline: 14, accessState: '严格', riskLevel: 'high', alerts: 1, summary: '机房温升轻微抬高，门禁已切换双重授权模式。' },
  { id: 'l6', label: 'L6', zone: '数据与指挥中心', occupancy: 41, cameraOnline: 16, accessState: '严格', riskLevel: 'high', alerts: 3, summary: '北侧节点触发异常巡检，需联动摄像头复核。' },
  { id: 'l7', label: 'L7', zone: '高管与贵宾层', occupancy: 17, cameraOnline: 12, accessState: '严格', riskLevel: 'medium', alerts: 0, summary: '区域安静，门禁白名单运行正常。' },
  { id: 'rf', label: 'RF', zone: '屋顶设备层', occupancy: 5, cameraOnline: 10, accessState: '封控', riskLevel: 'medium', alerts: 1, summary: '夜间巡检重点区域，风机与周界摄像头在线。' },
];

const alerts = [
  { id: 'a1', title: '北侧弱电井门磁异常', severity: 'high', floorId: 'l6', zone: '北侧弱电井', time: '19:42' },
  { id: 'a2', title: '机房温升超过阈值', severity: 'high', floorId: 'l5', zone: 'A 区机房', time: '19:31' },
  { id: 'a3', title: '会议层通道滞留提醒', severity: 'medium', floorId: 'l3', zone: '西侧会议通廊', time: '19:28' },
  { id: 'a4', title: '停车层消防门开启超时', severity: 'medium', floorId: 'b1', zone: '东侧消防门', time: '19:12' },
];

const zones = [
  { name: '主入口大堂', state: '正常', detail: '闸机 16/16 在线', tone: 'ok' },
  { name: 'A 区机房', state: '关注', detail: '温度 26.8°C，较基线 +1.9°C', tone: 'warn' },
  { name: '高管通道', state: '受控', detail: '双因子门禁已开启', tone: 'neutral' },
  { name: '屋顶周界', state: '巡检中', detail: '无人值守摄像头 10/10 在线', tone: 'ok' },
];

const modules = [
  {
    eyebrow: '事件联动',
    title: '告警触发后自动回放路径与视角',
    body: '将门禁、摄像头、巡检轨迹和楼层热度收束为同一条事件链，减少人工切换系统的时间。'
  },
  {
    eyebrow: '重点区域',
    title: '机房、贵宾区、周界以差异化策略守护',
    body: '高等级区域使用更亮的骨架与热区标识，弱化非关键楼层，让值守视线始终集中在风险点。'
  },
  {
    eyebrow: '设备健康',
    title: '在线率、遮挡率与门禁策略同步显示',
    body: '把摄像头、门禁、电梯和环境传感的健康度直接绑定在空间上，不再只看二维列表。'
  },
  {
    eyebrow: '夜间巡检',
    title: '巡检路线与异常停留一眼可见',
    body: '夜间模式降低环境亮度，保留周界、机房和竖井路径的发光轨迹，突出稀疏场景中的异常活动。'
  },
];

function riskText(riskLevel) {
  switch (riskLevel) {
    case 'high':
      return '高风险';
    case 'medium':
      return '中风险';
    default:
      return '低风险';
  }
}

function SecurityTwinScene({ floors, activeFloorId, onHoverFloor, onPinFloor }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const floorEntriesRef = useRef([]);
  const ringRef = useRef(null);
  const pulseGroupRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0, down: false, drag: false, originX: 0, rotationY: 0 });
  const activeFloorRef = useRef(activeFloorId);

  useEffect(() => {
    activeFloorRef.current = activeFloorId;
  }, [activeFloorId]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x07131d, 0.045);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 5.7, 18.2);

    const root = new THREE.Group();
    root.rotation.x = -0.22;
    root.rotation.y = 0.62;
    root.scale.setScalar(0.9);
    scene.add(root);

    const ambient = new THREE.AmbientLight(0xaedcff, 0.9);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xc4fbff, 1.5);
    keyLight.position.set(8, 14, 14);
    scene.add(keyLight);

    const backLight = new THREE.DirectionalLight(0x44d7ff, 1.15);
    backLight.position.set(-10, 4, -10);
    scene.add(backLight);

    const fillLight = new THREE.PointLight(0x74f1ff, 2.8, 30, 2);
    fillLight.position.set(0, 4, 7);
    scene.add(fillLight);

    const groundGrid = new THREE.GridHelper(28, 16, 0x1f7a8c, 0x0c2d37);
    groundGrid.position.y = -9.5;
    groundGrid.material.opacity = 0.2;
    groundGrid.material.transparent = true;
    root.add(groundGrid);

    const haloGeometry = new THREE.RingGeometry(5.8, 6.6, 72);
    const haloMaterial = new THREE.MeshBasicMaterial({
      color: 0x64eaff,
      transparent: true,
      opacity: 0.16,
      side: THREE.DoubleSide,
    });
    const halo = new THREE.Mesh(haloGeometry, haloMaterial);
    halo.rotation.x = -Math.PI / 2;
    halo.position.y = -8.9;
    root.add(halo);
    ringRef.current = halo;

    const shellGeometry = new THREE.BoxGeometry(8.6, 17.2, 8.6);
    const shellMaterial = new THREE.MeshStandardMaterial({
      color: 0x89ecff,
      emissive: 0x4bc6e3,
      emissiveIntensity: 0.1,
      transparent: true,
      opacity: 0.08,
      roughness: 0.2,
      metalness: 0.08,
    });
    const shell = new THREE.Mesh(shellGeometry, shellMaterial);
    shell.position.y = -0.1;
    root.add(shell);

    const shellEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(shellGeometry),
      new THREE.LineBasicMaterial({ color: 0xa8fbff, transparent: true, opacity: 0.92 })
    );
    shellEdges.position.copy(shell.position);
    root.add(shellEdges);

    const core = new THREE.Mesh(
      new THREE.BoxGeometry(2.3, 17, 2.3),
      new THREE.MeshBasicMaterial({ color: 0x7bfff3, transparent: true, opacity: 0.16 })
    );
    root.add(core);

    const spineMaterial = new THREE.LineBasicMaterial({ color: 0x74f1ff, transparent: true, opacity: 0.78 });
    const spineLines = [];
    [-3.65, 3.65].forEach((x) => {
      [-3.65, 3.65].forEach((z) => {
        const points = [new THREE.Vector3(x, -8.55, z), new THREE.Vector3(x, 8.25, z)];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, spineMaterial);
        root.add(line);
        spineLines.push(line);
      });
    });

    const floorEntries = floors.map((floor, index) => {
      const group = new THREE.Group();
      const y = -7.4 + index * 1.85;
      group.position.y = y;

      const slabGeometry = new THREE.BoxGeometry(7.5, 0.38, 7.5);
      const color = floor.riskLevel === 'high' ? 0xff896b : floor.riskLevel === 'medium' ? 0xffc26f : 0x6ef7df;
      const slabMaterial = new THREE.MeshStandardMaterial({
        color: 0x113444,
        emissive: color,
        emissiveIntensity: 0.26,
        transparent: true,
        opacity: 0.92,
        roughness: 0.4,
        metalness: 0.15,
      });
      const slab = new THREE.Mesh(slabGeometry, slabMaterial);
      slab.userData.floorId = floor.id;
      group.add(slab);

      const slabEdges = new THREE.LineSegments(
        new THREE.EdgesGeometry(slabGeometry),
        new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.98 })
      );
      slabEdges.userData.floorId = floor.id;
      group.add(slabEdges);

      const zoneBar = new THREE.Mesh(
        new THREE.BoxGeometry(1.8, 0.16, 0.48),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.76 })
      );
      zoneBar.position.set(-1.6, 0.26, 2.1);
      group.add(zoneBar);

      const corridor = new THREE.Mesh(
        new THREE.BoxGeometry(4.2, 0.08, 0.12),
        new THREE.MeshBasicMaterial({ color: 0x8ef6ff, transparent: true, opacity: 0.38 })
      );
      corridor.position.set(0, 0.24, 0);
      group.add(corridor);

      root.add(group);
      return { floor, group, slab, slabMaterial, slabEdges, zoneBar };
    });
    floorEntriesRef.current = floorEntries;

    const pulseGroup = new THREE.Group();
    floors.forEach((floor, index) => {
      const y = -7.05 + index * 1.85;
      const pulse = new THREE.Mesh(
        new THREE.SphereGeometry(0.18, 18, 18),
        new THREE.MeshBasicMaterial({ color: 0x9efeff, transparent: true, opacity: 0.95 })
      );
      pulse.position.set(index % 2 === 0 ? 2.4 : -2.2, y, 2.5);
      pulse.userData.floorId = floor.id;
      pulseGroup.add(pulse);
    });
    root.add(pulseGroup);
    pulseGroupRef.current = pulseGroup;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const interactiveObjects = floorEntries.flatMap((entry) => [entry.slab, entry.slabEdges]);

    const resize = () => {
      const { clientWidth, clientHeight } = mount;
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);

    const setMouseFromEvent = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handlePointerMove = (event) => {
      setMouseFromEvent(event);
      if (pointerRef.current.down) {
        const delta = event.clientX - pointerRef.current.originX;
        pointerRef.current.drag = true;
        root.rotation.y = pointerRef.current.rotationY + delta * 0.006;
      }

      raycaster.setFromCamera(mouse, camera);
      const hit = raycaster.intersectObjects(interactiveObjects, false)[0];
      if (hit?.object?.userData?.floorId) {
        onHoverFloor(hit.object.userData.floorId);
      } else {
        onHoverFloor(null);
      }
    };

    const handlePointerDown = (event) => {
      pointerRef.current.down = true;
      pointerRef.current.drag = false;
      pointerRef.current.originX = event.clientX;
      pointerRef.current.rotationY = root.rotation.y;
    };

    const clearPointer = () => {
      pointerRef.current.down = false;
    };

    const handleClick = (event) => {
      if (pointerRef.current.drag) return;
      setMouseFromEvent(event);
      raycaster.setFromCamera(mouse, camera);
      const hit = raycaster.intersectObjects(interactiveObjects, false)[0];
      if (hit?.object?.userData?.floorId) {
        onPinFloor(hit.object.userData.floorId);
      }
    };

    const handleLeave = () => {
      onHoverFloor(null);
      pointerRef.current.down = false;
    };

    renderer.domElement.addEventListener('pointermove', handlePointerMove);
    renderer.domElement.addEventListener('pointerdown', handlePointerDown);
    renderer.domElement.addEventListener('pointerup', clearPointer);
    renderer.domElement.addEventListener('pointerleave', handleLeave);
    renderer.domElement.addEventListener('click', handleClick);

    let frameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();
      const focusFloorId = activeFloorRef.current;

      root.rotation.y += pointerRef.current.down ? 0 : 0.0026;
      root.position.y = Math.sin(t * 0.8) * 0.15;
      halo.material.opacity = 0.12 + Math.sin(t * 1.8) * 0.03;
      fillLight.intensity = 2.5 + Math.sin(t * 1.1) * 0.25;
      shellMaterial.emissiveIntensity = 0.16 + Math.sin(t * 0.9) * 0.05;

      floorEntries.forEach((entry, index) => {
        const isActive = entry.floor.id === focusFloorId;
        const pulse = 0.12 + (Math.sin(t * 2.4 + index * 0.7) + 1) * 0.06;
        entry.slabMaterial.emissiveIntensity = isActive ? 1.1 : pulse;
        entry.slabMaterial.opacity = isActive ? 1 : 0.82;
        entry.group.position.x = isActive ? Math.sin(t * 2 + index) * 0.04 : 0;
        entry.group.scale.setScalar(isActive ? 1.02 : 1);
        entry.zoneBar.material.opacity = isActive ? 1 : 0.72;
      });

      pulseGroup.children.forEach((pulse, index) => {
        const isActive = pulse.userData.floorId === focusFloorId;
        const scale = 0.92 + Math.sin(t * 3.2 + index * 0.6) * 0.18 + (isActive ? 0.32 : 0);
        pulse.scale.setScalar(scale);
        pulse.material.opacity = isActive ? 1 : 0.45;
      });

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      renderer.domElement.removeEventListener('pointermove', handlePointerMove);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      renderer.domElement.removeEventListener('pointerup', clearPointer);
      renderer.domElement.removeEventListener('pointerleave', handleLeave);
      renderer.domElement.removeEventListener('click', handleClick);

      floorEntries.forEach((entry) => {
        entry.slab.geometry.dispose();
        entry.slabMaterial.dispose();
        entry.slabEdges.geometry.dispose();
        entry.slabEdges.material.dispose();
        entry.zoneBar.geometry.dispose();
        entry.zoneBar.material.dispose();
      });

      pulseGroup.children.forEach((pulse) => {
        pulse.geometry.dispose();
        pulse.material.dispose();
      });

      shell.geometry.dispose();
      shell.material.dispose();
      shellEdges.geometry.dispose();
      shellEdges.material.dispose();
      core.geometry.dispose();
      core.material.dispose();
      spineLines.forEach((line) => line.geometry.dispose());
      spineMaterial.dispose();
      halo.geometry.dispose();
      halo.material.dispose();
      groundGrid.geometry.dispose();
      groundGrid.material.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [floors, onHoverFloor, onPinFloor]);

  return <div className="security-scene" ref={mountRef} aria-label="透明楼宇数字孪生三维视图" />;
}

export default function SecurityDigitalTwinPage() {
  const [hoveredFloorId, setHoveredFloorId] = useState(null);
  const [pinnedFloorId, setPinnedFloorId] = useState('l6');
  const [timeText, setTimeText] = useState('');

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      month: '2-digit',
      day: '2-digit',
    });

    const updateTime = () => setTimeText(formatter.format(new Date()));
    updateTime();
    const timer = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const activeFloorId = hoveredFloorId ?? pinnedFloorId;
  const activeFloor = useMemo(
    () => buildingFloors.find((floor) => floor.id === activeFloorId) ?? buildingFloors[0],
    [activeFloorId]
  );

  const totalAlerts = alerts.length;
  const highAlerts = alerts.filter((item) => item.severity === 'high').length;
  const totalCameras = buildingFloors.reduce((sum, floor) => sum + floor.cameraOnline, 0);
  const avgOccupancy = Math.round(
    buildingFloors.reduce((sum, floor) => sum + floor.occupancy, 0) / buildingFloors.length
  );

  return (
    <div className="security-page">
      <div className="security-page__grid" />
      <div className="security-page__glow security-page__glow--left" />
      <div className="security-page__glow security-page__glow--right" />

      <header className="security-topbar">
        <a className="security-brand" href="/">
          <span className="security-brand__mark">GT</span>
          <span className="security-brand__copy">
            <strong>Guardian Twin</strong>
            <em>楼宇安防数字孪生中枢</em>
          </span>
        </a>

        <div className="security-topbar__meta">
          <span className="security-pill security-pill--online">系统在线</span>
          <span className="security-topbar__campus">上海徐汇园区 / T1 主楼</span>
          <span className="security-topbar__time">{timeText}</span>
        </div>
      </header>

      <main className="security-main">
        <section className="security-canvas-shell">
          <div className="security-hero__stage security-hero__stage--fullscreen">
            <SecurityTwinScene
              floors={buildingFloors}
              activeFloorId={activeFloor.id}
              onHoverFloor={setHoveredFloorId}
              onPinFloor={setPinnedFloorId}
            />

            <div className="security-stage__overlay security-stage__overlay--left">
              <span>建筑主题</span>
              <strong>透明立面 / 楼层骨架</strong>
            </div>
            <div className="security-stage__overlay security-stage__overlay--right">
              <span>当前焦点</span>
              <strong>{activeFloor.label} / {activeFloor.zone}</strong>
            </div>
          </div>

          <section className="security-overlay security-overlay--top">
            <div className="security-overview__title security-floating-card">
              <span className="security-kicker">楼宇安防监控大屏 / Security Operations Center</span>
              <h1>建筑居中，态势环绕。</h1>
              <p>页面整体是一张主画面，所有告警、楼层、巡检与重点区域都作为浮层叠加在建筑主题之上。</p>
            </div>

            <div className="security-metrics security-metrics--floating">
              <article className="security-floating-card">
                <strong>{totalAlerts}</strong>
                <span>今日告警</span>
              </article>
              <article className="security-floating-card">
                <strong>{highAlerts}</strong>
                <span>高优事件</span>
              </article>
              <article className="security-floating-card">
                <strong>{totalCameras}</strong>
                <span>在线摄像头</span>
              </article>
              <article className="security-floating-card">
                <strong>{avgOccupancy}%</strong>
                <span>平均占用率</span>
              </article>
            </div>
          </section>

          <section className="security-overlay security-overlay--left">
            <section className="security-panel security-panel--highlight">
              <span className="security-panel__eyebrow">楼层态势</span>
              <h2>{activeFloor.label} {activeFloor.zone}</h2>
              <p>{activeFloor.summary}</p>

              <div className="security-panel__stats">
                <div>
                  <span>风险等级</span>
                  <strong>{riskText(activeFloor.riskLevel)}</strong>
                </div>
                <div>
                  <span>在线设备</span>
                  <strong>{activeFloor.cameraOnline}</strong>
                </div>
                <div>
                  <span>门禁策略</span>
                  <strong>{activeFloor.accessState}</strong>
                </div>
                <div>
                  <span>人员热度</span>
                  <strong>{activeFloor.occupancy}%</strong>
                </div>
              </div>
            </section>

            <section className="security-panel">
              <div className="security-panel__head">
                <span className="security-panel__eyebrow">重点区域</span>
                <strong>4 个区域</strong>
              </div>
              <div className="security-zones">
                {zones.map((zone) => (
                  <article key={zone.name} className={`security-zone security-zone--${zone.tone}`}>
                    <div>
                      <strong>{zone.name}</strong>
                      <span>{zone.detail}</span>
                    </div>
                    <em>{zone.state}</em>
                  </article>
                ))}
              </div>
            </section>
          </section>

          <section className="security-overlay security-overlay--right">
            <section className="security-panel">
              <div className="security-panel__head">
                <span className="security-panel__eyebrow">实时告警</span>
                <strong>{highAlerts} 条高优</strong>
              </div>

              <div className="security-alerts">
                {alerts.map((alert) => (
                  <button
                    key={alert.id}
                    type="button"
                    className={`security-alert security-alert--${alert.severity} ${alert.floorId === activeFloor.id ? 'is-active' : ''}`}
                    onClick={() => setPinnedFloorId(alert.floorId)}
                  >
                    <span className="security-alert__time">{alert.time}</span>
                    <strong>{alert.title}</strong>
                    <em>{alert.zone}</em>
                  </button>
                ))}
              </div>
            </section>

            <section className="security-panel">
              <div className="security-panel__head">
                <span className="security-panel__eyebrow">楼层切换</span>
                <strong>{buildingFloors.length} 层</strong>
              </div>

              <div className="security-floorband__list security-floorband__list--panel">
                {buildingFloors.map((floor) => (
                  <button
                    key={floor.id}
                    type="button"
                    className={`security-floorpill ${floor.id === activeFloor.id ? 'is-active' : ''}`}
                    onMouseEnter={() => setHoveredFloorId(floor.id)}
                    onMouseLeave={() => setHoveredFloorId(null)}
                    onFocus={() => setHoveredFloorId(floor.id)}
                    onBlur={() => setHoveredFloorId(null)}
                    onClick={() => setPinnedFloorId(floor.id)}
                  >
                    <span>{floor.label}</span>
                    <strong>{floor.zone}</strong>
                    <em>{riskText(floor.riskLevel)}</em>
                  </button>
                ))}
              </div>
            </section>
          </section>

          <section className="security-overlay security-overlay--bottom" aria-label="底部联动区">
            <div className="security-floorband security-floorband--floating">
              <div className="security-floorband__header">
                <span>底部联动区</span>
                <strong>事件联动、设备健康与巡检策略围绕主楼展开</strong>
              </div>
            </div>

            <section className="security-modules security-modules--floating">
              {modules.map((module) => (
                <article key={module.title} className="security-module">
                  <span>{module.eyebrow}</span>
                  <h2>{module.title}</h2>
                  <p>{module.body}</p>
                </article>
              ))}
            </section>
          </section>
        </section>
      </main>
    </div>
  );
}
