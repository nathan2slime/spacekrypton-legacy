import { langs } from '@kry/i18n';
import { AppI18nLang } from '@kry/i18n';
import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'kry-logout',
  styleUrl: 'logout.styles.scss',
  shadow: true,
})
export class KryLogout {
  @Prop() avatar: string;
  @Prop() email: string;
  @Prop() username: string;
  @Prop() language: AppI18nLang;

  @Prop() open: boolean;

  @Event({ bubbles: false }) kryDialogLogout: EventEmitter<boolean>;
  @Event({ composed: false }) kryRedirect: EventEmitter<string>;
  @Event({ composed: false }) kryToggleDropdown: EventEmitter<boolean>;

  onRedirect = (value: string) => {
    this.kryToggleDropdown.emit(false);
    this.kryRedirect.emit(value);
  };

  render() {
    const styles = {
      backgroundImage: `url(${this.avatar})`,
    };

    return (
      <Host>
        <div class="wrapper">
          <div style={styles} />

          <kry-dropdown
            dropdown="logout"
            open={this.open}
            onKryClose={() => this.kryToggleDropdown.emit(false)}
          >
            <kry-dropdown-item
              hover={false}
              name={langs[this.language].web.sidebar.logout}
              icon="ri-logout-circle-"
              kry-dialog
              onClick={() => this.kryDialogLogout.emit(true)}
            />
          </kry-dropdown>

          <div>
            <h6>{this.username}</h6>

            <p>{this.email}</p>
          </div>

          <div>
            <kry-icon
              onClick={() => this.kryToggleDropdown.emit(true)}
              kry-dropdown="logout"
              name="ri-more-2-fill"
            />
          </div>
        </div>
      </Host>
    );
  }
}
