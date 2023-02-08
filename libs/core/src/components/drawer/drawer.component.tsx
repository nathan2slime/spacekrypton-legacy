import {
  Component,
  Host,
  h,
  Prop,
  Element,
  Event,
  EventEmitter,
  Listen,
} from '@stencil/core';

import { KryAnchor } from '../../utils/types';

@Component({
  tag: 'kry-drawer',
  styleUrl: 'drawer.styles.scss',
  shadow: true,
})
export class KryDrawer {
  @Prop() open: boolean;
  @Prop() anchor: KryAnchor = 'right';
  @Prop() zIndex: number = 10;
  @Prop() blurShadow: boolean;
  @Prop() shadow: boolean = true;
  @Prop() color: string;

  @Event({ composed: false }) kryClose: EventEmitter<boolean>;

  @Element() host: HTMLKryDrawerElement;

  wrapper: HTMLDivElement;

  @Listen('click', { target: 'window' })
  listenClick(e: any) {
    const path = e.path || (e.composedPath && e.composedPath());
    const trigger = path.find(
      (el: HTMLElement) => el?.hasAttribute && el.hasAttribute('kry-drawer')
    );

    if (trigger) return;

    if (!path.includes(this.wrapper)) {
      this.kryClose.emit(true);
    }
  }

  render() {
    const styles = {
      background: this.color,
      zIndex: this.zIndex.toString(),
    };

    return (
      <Host>
        <div
          class={{
            wrapper: true,
            open: this.open,
            shadow: this.shadow,
            blurShadow: this.blurShadow,
            [this.anchor]: !!this.anchor,
          }}
          style={styles}
        >
          <div ref={el => (this.wrapper = el)} class="drawer">
            <slot />
          </div>
        </div>
      </Host>
    );
  }
}
