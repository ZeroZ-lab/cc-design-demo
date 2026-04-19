/**
 * Deck Stage — Fixed-size slide presentation stage with scaling, keyboard nav,
 * slide-count overlay, localStorage persistence, and print-to-PDF support.
 *
 * Usage: <deck-stage> wraps <section> elements as slides (1920x1080 fixed canvas).
 * Load via: <script src="deck_stage.js"></script>
 */

class DeckStage extends HTMLElement {
  constructor() {
    super();
    this.currentSlide = 0;
    this.slides = [];
  }

  connectedCallback() {
    this.slides = Array.from(this.querySelectorAll(':scope > section'));
    if (this.slides.length === 0) return;

    const saved = localStorage.getItem('cc-deck-position');
    if (saved !== null) this.currentSlide = Math.min(parseInt(saved, 10), this.slides.length - 1);

    this.slides.forEach((slide, index) => {
      slide.style.display = index === this.currentSlide ? '' : 'none';
      if (!slide.hasAttribute('data-screen-label')) {
        slide.setAttribute('data-screen-label', `${String(index + 1).padStart(2, '0')}`);
      }
      slide.setAttribute('data-om-validate', '');
    });

    this._build();
    this._scale();
    this._postIndex();

    window.addEventListener('resize', () => this._scale());
    document.addEventListener('keydown', (event) => this._onKey(event));
  }

  _build() {
    this.canvas = document.createElement('div');
    this.canvas.style.cssText = 'width:1920px;height:1080px;position:relative;transform-origin:top left;';

    this.slides.forEach((slide) => this.canvas.appendChild(slide));
    this.appendChild(this.canvas);

    this.counter = document.createElement('div');
    this.counter.style.cssText = 'position:fixed;bottom:12px;left:50%;transform:translateX(-50%);font:13px/1 system-ui,sans-serif;color:rgba(255,255,255,.6);z-index:100;pointer-events:none;';
    this._updateCounter();
    this.appendChild(this.counter);

    const buttonStyle = 'position:fixed;top:50%;transform:translateY(-50%);z-index:100;width:44px;height:44px;border-radius:50%;border:1px solid rgba(255,255,255,.2);background:rgba(0,0,0,.4);color:#fff;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;';

    this.prevBtn = document.createElement('button');
    this.prevBtn.innerHTML = '‹';
    this.prevBtn.style.cssText = buttonStyle + 'left:12px;';
    this.prevBtn.onclick = () => this.go(this.currentSlide - 1);

    this.nextBtn = document.createElement('button');
    this.nextBtn.innerHTML = '›';
    this.nextBtn.style.cssText = buttonStyle + 'right:12px;';
    this.nextBtn.onclick = () => this.go(this.currentSlide + 1);

    this.appendChild(this.prevBtn);
    this.appendChild(this.nextBtn);
  }

  _scale() {
    if (!this.canvas) return;
    const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    this.canvas.style.transform = `scale(${scale})`;
    this.style.width = '100vw';
    this.style.height = '100vh';
    this.style.background = '#171411';
    this.style.overflow = 'hidden';
  }

  _onKey(event) {
    if (event.key === 'ArrowRight' || event.key === ' ') {
      event.preventDefault();
      this.go(this.currentSlide + 1);
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.go(this.currentSlide - 1);
    }
    if (event.key === 'Home') {
      event.preventDefault();
      this.go(0);
    }
    if (event.key === 'End') {
      event.preventDefault();
      this.go(this.slides.length - 1);
    }
  }

  go(index) {
    if (index < 0 || index >= this.slides.length) return;
    this.slides[this.currentSlide].style.display = 'none';
    this.currentSlide = index;
    this.slides[this.currentSlide].style.display = '';
    this._updateCounter();
    this._postIndex();
    localStorage.setItem('cc-deck-position', String(index));
  }

  _updateCounter() {
    if (this.counter) {
      this.counter.textContent = `${this.currentSlide + 1} / ${this.slides.length}`;
    }
  }

  _postIndex() {
    window.postMessage({ slideIndexChanged: this.currentSlide }, '*');
  }
}

customElements.define('deck-stage', DeckStage);

if (typeof window !== 'undefined') {
  window.addEventListener('beforeprint', () => {
    const stage = document.querySelector('deck-stage');
    if (!stage) return;
    stage.slides.forEach((slide) => {
      slide.style.display = '';
      slide.style.pageBreakAfter = 'always';
    });
  });

  window.addEventListener('afterprint', () => {
    const stage = document.querySelector('deck-stage');
    if (!stage) return;
    stage.slides.forEach((slide, index) => {
      slide.style.display = index === stage.currentSlide ? '' : 'none';
      slide.style.pageBreakAfter = '';
    });
  });
}
