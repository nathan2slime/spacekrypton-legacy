import { Component, Host, h, Prop, Watch, Event, EventEmitter } from '@stencil/core';
import { KryColor, KryVariant } from '../../utils/types';

@Component({
  tag: 'kry-alert',
  styleUrl: 'alert.styles.scss',
  shadow: true,
})
export class BgUrl {
  @Prop() open: boolean;
  @Prop() color: KryColor = 'primary';
  @Prop() variant: KryVariant = 'solid';
  @Prop() block: boolean;
  @Prop() time: number = 1000;

  @Event({ composed: false }) kryClose: EventEmitter<boolean>;

  animation: NodeJS.Timeout;

  @Watch('open')
  toggleOpen() {
    this.animation && clearTimeout(this.animation);

    if (this.open) {
      this.animation = setTimeout(() => this.kryClose.emit(false), this.time);
    }
  }

  componentDidLoad() {
    this.toggleOpen();
  }

  render() {
    return (
      <Host>
        <div
          class={{
            wrapper: true,
            [this.color]: true,
            [this.variant]: true,
            open: this.open,
            block: this.block,
          }}
        >
          <slot />
        </div>
      </Host>
    );
  }
}
