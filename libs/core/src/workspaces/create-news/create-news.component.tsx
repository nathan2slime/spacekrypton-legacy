import { Component, Host, h, EventEmitter, Event, Prop } from '@stencil/core';

import { KryAlert } from '../../utils/types';

@Component({
  tag: 'kry-create-news',
  styleUrl: 'create-news.styles.scss',
  shadow: true,
})
export class KryCreateNews {
  @Prop() name: string;
  @Prop() description: string;
  @Prop() image: string;
  @Prop() font: string;
  @Prop() content: string;
  @Prop() isLoading: boolean;
  @Prop() isValid: boolean;
  @Prop() nameMessage: string;
  @Prop() contentMessage: string;
  @Prop() fontMessage: string;
  @Prop() imageMessage: string;
  @Prop() descriptionMessage: string;
  @Prop() edit: boolean;
  @Prop() alert: KryAlert;

  @Event({ composed: false }) kryFallback: EventEmitter<boolean>;
  @Event({ composed: false }) kryChangeName: EventEmitter<string>;
  @Event({ composed: false }) kryChangeContent: EventEmitter<string>;
  @Event({ composed: false }) kryChangeFont: EventEmitter<string>;
  @Event({ composed: false }) kryChangeImage: EventEmitter<string>;
  @Event({ composed: false }) kryChangeDescription: EventEmitter<string>;
  @Event({ composed: false }) krySubmit: EventEmitter<boolean>;
  @Event({ composed: false }) kryAlertChange: EventEmitter<KryAlert>;

  render() {
    const label = this.edit ? 'Edit' : 'Create';

    return (
      <Host>
        <div class="wrapper">
          <header>
            <div>
              <kry-icon
                onClick={() => this.kryFallback.emit(true)}
                name="ri-arrow-left-s-line"
              />
              {label} news
            </div>
          </header>

          <div>
            <div>
              <kry-input
                value={this.name}
                invalid={!!this.nameMessage}
                message={this.nameMessage}
                onKryChangeValue={e => this.kryChangeName.emit(e.detail)}
                label="Name"
              />

              <kry-input
                value={this.description}
                invalid={!!this.descriptionMessage}
                message={this.descriptionMessage}
                onKryChangeValue={e => this.kryChangeDescription.emit(e.detail)}
                label="Description"
              />
            </div>

            <div>
              <kry-input
                value={this.image}
                invalid={!!this.imageMessage}
                message={this.imageMessage}
                onKryChangeValue={e => this.kryChangeImage.emit(e.detail)}
                label="Preview"
              />
              <kry-input
                value={this.font}
                invalid={!!this.fontMessage}
                message={this.fontMessage}
                onKryChangeValue={e => this.kryChangeFont.emit(e.detail)}
                label="Origin"
              />
            </div>

            <kry-editor
              invalid={!!this.contentMessage}
              message={this.contentMessage}
              value={this.content}
              onKryChange={e => this.kryChangeContent.emit(e.detail)}
            />

            <kry-button
              onClick={() => this.krySubmit.emit(true)}
              disable={!this.isValid}
              light="down"
              color="secondary"
              block
              bold={700}
            >
              {this.isLoading ? <slot /> : <span>{label}</span>}
            </kry-button>
          </div>
        </div>

        <kry-alert
          {...this.alert}
          onKryClose={() => this.kryAlertChange.emit({ ...this.alert, open: false })}
        >
          <p>{this.alert?.title}</p>
        </kry-alert>
      </Host>
    );
  }
}
