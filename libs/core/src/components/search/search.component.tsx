import { Event, EventEmitter, Prop, State } from '@stencil/core';
import { Component, Host, h } from '@stencil/core';
import { KryColor, KryInputType } from '../../utils/types';

@Component({
  tag: 'kry-search',
  styleUrl: 'search.styles.scss',
  shadow: true,
})
export class KrySearch {
  @Prop() loading: boolean;
  @Prop() value: string;
  @Prop() placeholder: string;
  @Prop() label: string;
  @Prop() message: string;
  @Prop() invalid: boolean;
  @Prop() color: KryColor = 'primary';
  @Prop() icon: string = 'ri-search-line';
  @Prop() type: KryInputType = 'text';

  @State() focus: boolean;

  @Event({ composed: false }) kryChangeValue: EventEmitter<string>;
  @Event({ composed: false }) krySearch: EventEmitter<boolean>;

  onBlur = () => (this.focus = false);
  onFocus = () => (this.focus = true);

  render() {
    return (
      <Host>
        <div
          class={{
            wrapper: true,
            invalid: this.invalid,
            [this.color]: true,
            loading: this.loading,
            focus: this.focus,
          }}
        >
          <input
            type={this.type}
            placeholder={this.placeholder}
            value={this.value}
            onFocus={() => this.onFocus()}
            onBlur={() => this.onBlur()}
            onKeyPress={e => e.key == 'Enter' && this.krySearch.emit(true)}
            onInput={(e: any) => this.kryChangeValue.emit(e.target.value)}
          />

          <button
            onClick={() => this.krySearch.emit(true)}
            onFocus={() => this.onFocus()}
            onBlur={() => this.onBlur()}
          >
            <kry-icon name={this.icon} />
          </button>
        </div>
      </Host>
    );
  }
}
