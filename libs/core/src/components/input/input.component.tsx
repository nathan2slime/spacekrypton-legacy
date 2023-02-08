import { Component, Host, h, Prop, EventEmitter, Event } from '@stencil/core';

import { KryColor, KryInputType } from '../../utils/types';

@Component({
  tag: 'kry-input',
  styleUrl: 'input.styles.scss',
  shadow: true,
})
export class KryInput {
  @Prop() value: string;
  @Prop() placeholder: string;
  @Prop() resize: boolean;
  @Prop() height: number;
  @Prop() label: string;
  @Prop() message: string;
  @Prop() invalid: boolean;
  @Prop() color: KryColor = 'primary';
  @Prop() type: KryInputType = 'text';

  @Event() kryChangeValue: EventEmitter<string>;

  render() {
    const styles = { minHeight: this.height + 'px' };
    const El = this.height ? 'textarea' : 'input';

    return (
      <Host>
        <div
          class={{
            wrapper: true,
            invalid: this.invalid,
            resize: this.resize,
            [this.color]: true,
          }}
        >
          {this.label && <label>{this.label}</label>}

          <El
            type={this.type}
            placeholder={this.placeholder}
            value={this.value}
            style={styles}
            onInput={(e: any) => this.kryChangeValue.emit(e.target.value)}
          />

          {this.invalid && <span>{this.message}</span>}
        </div>
      </Host>
    );
  }
}
