import {
  Component,
  Host,
  h,
  Prop,
  Listen,
  Element,
  Event,
  EventEmitter,
} from '@stencil/core';

@Component({
  tag: 'kry-dropdown',
  styleUrl: 'dropdown.styles.scss',
  shadow: true,
})
export class KryDropdown {
  @Prop() open: boolean;
  @Prop() dropdown: string;

  @Element() host: HTMLKryDropdownElement;

  @Event({ composed: false }) kryClose: EventEmitter<boolean>;

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

      const rect = trigger.getBoundingClientRect();
      const clientHeight = document.documentElement.clientHeight;
      const clientWidth = document.documentElement.clientWidth;

      const isValidLeft = clientWidth - rect.right < this.host.scrollWidth;
      const isValidTop = clientHeight - rect.top < this.host.scrollHeight;

      if (isValidTop) {
        this.host.style.bottom = clientHeight - rect.top + 'px';
      } else {
        this.host.style.top = rect.top + 'px';
      }

      if (isValidLeft) {
        this.host.style.right = clientWidth - rect.left + 'px';
      } else {
        this.host.style.left = rect.left + 'px';
      }
    }
  }

  render() {
    return (
      <Host class={{ open: this.open }}>
        <slot />
      </Host>
    );
  }
}
