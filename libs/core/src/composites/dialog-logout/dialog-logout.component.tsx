import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'kry-dialog-logout',
  styleUrl: 'dialog-logout.styles.scss',
  shadow: true,
})
export class KryDialogLogout {
  @Prop({ reflect: true }) open: boolean;
  @Prop() icon: string = 'ri-logout-circle-r-fill';
  @Prop() name: string = 'Do you really want to log out?';

  @Event({ composed: false }) kryClose: EventEmitter<boolean>;
  @Event({ composed: false }) kryConfirm: EventEmitter<boolean>;

  render() {
    return (
      <Host>
        <div class="wrapper">
          <kry-dialog open={this.open} onKryClose={() => this.kryClose.emit(true)}>
            <div class="dialog">
              <div>
                <div>
                  <kry-icon name={this.icon} />
                  <h4>{this.name}</h4>
                </div>

                <kry-icon onClick={() => this.kryClose.emit(true)} name="ri-close-fill" />
              </div>

              <div>
                <kry-button
                  color="tertiary"
                  light="down"
                  onClick={() => {
                    this.kryConfirm.emit(true);
                    this.kryClose.emit(true);
                  }}
                >
                  <div>
                    <span>Confirm</span>
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
