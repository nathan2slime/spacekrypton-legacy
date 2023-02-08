import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'kry-dialog-location',
  styleUrl: 'dialog-location.styles.scss',
  shadow: true,
})
export class KryDialogLocation {
  @Prop({ reflect: true }) open: boolean;

  @Event({ composed: false }) kryRequestLocation: EventEmitter<boolean>;
  @Event({ composed: false }) kryClose: EventEmitter<boolean>;
  @Event({ composed: false }) kryRedirect: EventEmitter<string>;

  render() {
    return (
      <Host>
        <div class="wrapper">
          <kry-dialog open={this.open} fixed={false}>
            <div class="dialog">
              <kry-icon
                onClick={() => this.kryRedirect.emit('/')}
                name="ri-arrow-left-s-line"
              />

              <div>
                <kry-icon name="ri-map-pin-user-fill" />
                <h4>Allow access to your location</h4>
              </div>

              <div>
                <kry-button
                  color="primary"
                  light="up"
                  onClick={() => {
                    this.kryRequestLocation.emit(true);
                  }}
                >
                  <div>
                    <span>ALLOW</span>
                  </div>
                </kry-button>
              </div>
            </div>
          </kry-dialog>
        </div>
      </Host>
    );
  }
}
