import {
  Component,
  Host,
  h,
  Listen,
  Element,
  Event,
  EventEmitter,
  Prop,
} from '@stencil/core';

@Component({
  tag: 'kry-dialog',
  styleUrl: 'dialog.styles.scss',
  shadow: true,
})
export class KryDialog {
  @Prop() fixed?: boolean = true;
  @Prop() open: boolean;

  @Element() host: HTMLKryDialogElement;

  @Event({ composed: false }) kryClose: EventEmitter<boolean>;

  wrapper: HTMLDivElement;

  @Listen('click', { target: 'window' })
  listenClick(e: any) {
    const els: HTMLElement[] = e.path || (e.composedPath && e.composedPath());

    if (!els.includes(this.wrapper)) {
      const trigger = els.find(
        (el: HTMLElement) => el?.hasAttribute && el.hasAttribute('kry-dialog')
      );

      if (!trigger) {
        return this.kryClose.emit(true);
      }
    }
  }

  render() {
    return (
      <Host>
        <div class={{ wrapper: true, open: this.open, fixed: this.fixed }}>
          <div ref={el => (this.wrapper = el)}>
            <slot />
          </div>
        </div>
      </Host>
    );
  }
}
