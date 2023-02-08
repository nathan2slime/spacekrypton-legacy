import { Component, Host, h, Prop } from '@stencil/core';

import {
  KryColor,
  KryButtonBold,
  KryVariant,
  KryButtonType,
  KrySize,
  KryLight,
} from '../../utils/types';

@Component({
  tag: 'kry-button',
  styleUrl: 'button.styles.scss',
  shadow: true,
})
export class KryButton {
  @Prop() block: boolean;
  @Prop() bold: KryButtonBold;
  @Prop() variant: KryVariant = 'solid';
  @Prop() light: KryLight = 'down';
  @Prop() type: KryButtonType = 'button';
  @Prop() color: KryColor = 'primary';
  @Prop() size: KrySize = 'medium';
  @Prop() disable: boolean;
  @Prop() shape: boolean;

  render() {
    const styles = {
      fontWeight: this.bold?.toString(),
    };

    return (
      <Host class={{ disable: this.disable }}>
        <button
          style={styles}
          type={this.type}
          class={{
            wrapper: true,
            block: this.block,
            [this.variant]: true,
            [this.light]: true,
            [this.size]: true,
            shape: this.shape,
            [this.color]: true,
          }}
        >
          <slot />
        </button>
      </Host>
    );
  }
}
