import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'kry-loading',
  styleUrl: 'loading.styles.scss',
  shadow: true,
})
export class KryLoading {
  @Prop() message: string;
  @Prop() white: boolean;

  render() {
    return (
      <Host>
        <div class={{ wrapper: true, white: this.white }}>
          <div />

          <div>
            <slot />

            <span>{this.message}</span>
          </div>
        </div>
      </Host>
    );
  }
}
