import {
  Component,
  Host,
  h,
  Prop,
  Listen,
  Element,
  Event,
  EventEmitter,
  Watch,
} from '@stencil/core';

@Component({
  tag: 'kry-dropdown',
  styleUrl: 'dropdown.styles.scss',
  shadow: true,
})
export class KryDropdown {
  @Prop() open: boolean;
  @Prop() top: number = 0;
  @Prop() left: number = 0;
  @Prop() dropdown: string;

  @Element() host: HTMLKryDropdownElement;

  @Event({ composed: false }) kryClose: EventEmitter<boolean>;

  rect: DOMRect;
  slot: HTMLSlotElement;

  @Watch('open')
  listenOpen() {
    if (!this.slot) {
      this.slot = document.createElement('slot');

      this.host.shadowRoot.appendChild(this.slot);
    }

    if (this.rect) {
      const clientHeight = document.documentElement.clientHeight;
      const clientWidth = document.documentElement.clientWidth;

      const isValidLeft = clientWidth - this.rect.right < this.host.scrollWidth;
      const isValidTop = clientHeight - this.rect.top < this.host.scrollHeight;

      if (isValidTop) {
        this.host.style.bottom = clientHeight + this.top - this.rect.top + 'px';
      } else {
        this.host.style.top = this.rect.top + this.top + 'px';
      }

      if (isValidLeft) {
        this.host.style.right = clientWidth + this.left - this.rect.left + 'px';
      } else {
        this.host.style.left = this.left + this.rect.left + 'px';
      }
    }
  }

  @Listen('click', { target: 'window' })
  listenClick(e: any) {
    const els: HTMLElement[] = e.path || (e.composedPath && e.composedPath());

    if (!els.includes(this.host)) {
      const trigger = els.find(
        (el: HTMLElement) =>
          el?.getAttribute && el.getAttribute('kry-dropdown') == this.dropdown
      );

      if (!trigger) {
        this.kryClose.emit(true);

        return;
      }

      this.rect = trigger.getBoundingClientRect();
    }
  }

  disconnectedCallback() {
    if (this.slot) this.slot.remove();
  }

  render() {
    return <Host class={{ open: this.open }} />;
  }
}
