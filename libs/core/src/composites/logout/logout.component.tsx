import { langs } from '@kry/i18n';
import { AppI18nLang } from '@kry/i18n';
import {
  Component,
  Host,
  h,
  Prop,
  State,
  Event,
  EventEmitter,
  Watch,
  Listen,
} from '@stencil/core';

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

  @State() open: boolean;
  @State() dialog: boolean;

  @Event({ bubbles: false }) kryLogoutApp: EventEmitter<boolean>;
  @Event({ composed: false }) kryRedirect: EventEmitter<string>;
  @Event({ composed: false }) kryCloseDrawer: EventEmitter<boolean>;

  elDialog: HTMLKryDialogElement;

  toggleOpen = (open?: boolean) => (this.open = open ?? !this.open);

  onRedirect = (value: string) => {
    this.toggleOpen(false);
    this.kryRedirect.emit(value);
  };

  @Listen('kryLogout', { target: 'document' })
  listenLogoutApp() {
    this.kryLogoutApp.emit(true);
  }

  @Watch('dialog')
  listenDialog() {
    if (!this.elDialog) {
      this.elDialog = document.createElement('kry-dialog-logout');
      document.body.appendChild(this.elDialog);

      this.elDialog.addEventListener('kryClose', () => (this.dialog = false));
      this.elDialog.addEventListener('kryConfirm', () => this.kryLogoutApp.emit(true));
    }

    this.kryCloseDrawer.emit(true);
    this.toggleOpen(false);
    this.elDialog.open = this.dialog;
  }

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
            onKryClose={() => this.toggleOpen(false)}
          >
            <kry-dropdown-item
              hover
              name={langs[this.language].web.sidebar.profile}
              onClick={() => this.kryRedirect.emit('/profile/me')}
              icon="ri-user-3-"
            />

            <kry-dropdown-item
              hover={false}
              name={langs[this.language].web.sidebar.logout}
              icon="ri-logout-circle-"
              kry-dialog
              onClick={() => (this.dialog = true)}
            />
          </kry-dropdown>

          <div>
            <h6>{this.username}</h6>

            <p>{this.email}</p>
          </div>

          <div>
            <kry-icon
              onClick={() => this.toggleOpen()}
              kry-dropdown="logout"
              name="ri-more-2-fill"
            />
          </div>
        </div>
      </Host>
    );
  }
}
