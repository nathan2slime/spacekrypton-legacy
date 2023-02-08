import {
  Component,
  Host,
  h,
  Prop,
  State,
  Event,
  EventEmitter,
  Listen,
  Watch,
} from '@stencil/core';

import { AppI18nLang, langs } from '@kry/i18n';

import { UserType } from '../../composites/sidebar/sidebar.model';
import { KryAlert } from '../../utils/types';

@Component({
  tag: 'kry-app',
  styleUrl: 'app.styles.scss',
  shadow: true,
})
export class KryApp {
  @Prop() user: UserType;
  @Prop() logged: boolean;
  @Prop() background: string;
  @Prop() language: AppI18nLang = 'en';
  @Prop() alert: KryAlert;
  @Prop() uniquePages: string[] = [];
  @Prop() currentItem: number = 0;
  @Prop() hide: boolean;
  @Prop() items = [];

  @State() drawer: boolean;

  @Event({ composed: false }) kryRedirect: EventEmitter<string>;
  @Event({ composed: false }) kryLogoutApp: EventEmitter<boolean>;
  @Event({ composed: false }) kryAlert: EventEmitter<KryAlert>;

  @Listen('setAppAlert', { target: 'document' })
  listenAlert(e: CustomEvent<KryAlert>) {
    this.kryAlert.emit(e.detail);
  }
  @Watch('language')
  loadItems() {
    this.items = [
      {
        name: langs[this.language].web.sidebar.satellites,
        route: '/',
        icon: 'ri-global-',
      },
      {
        name: langs[this.language].web.sidebar.news,
        route: '/news',
        icon: 'ri-newspaper-',
      },
    ];
  }

  sidebar = () => (
    <kry-sidebar
      logo="/logo.png"
      user={this.user}
      logged={this.logged}
      currentItem={this.currentItem}
      background={this.background}
      language={this.language}
      items={this.items}
      onKryLogoutApp={() => {
        this.kryLogoutApp.emit(true);
        this.drawer = false;
      }}
      onKryCloseDrawer={() => (this.drawer = false)}
      onKryRedirect={e => {
        this.kryRedirect.emit(e.detail);
        this.drawer = false;
      }}
    />
  );

  componentDidLoad() {
    this.loadItems();
  }

  render() {
    return (
      <Host>
        <div class="wrapper">
          {this.hide && this.sidebar()}

          <kry-drawer
            anchor="left"
            blurShadow
            open={this.drawer}
            zIndex={11}
            onKryClose={() => (this.drawer = false)}
          >
            {this.hide && this.sidebar()}
          </kry-drawer>

          <main>
            {this.hide && (
              <kry-navbar
                logo="/logo.png"
                onKryOpenDrawer={() => (this.drawer = true)}
                onKryRedirect={e => this.kryRedirect.emit(e.detail)}
              />
            )}

            <slot />
          </main>

          <kry-alert
            {...this.alert}
            onKryClose={() => this.kryAlert.emit({ ...this.alert, open: false })}
          >
            <p>{this.alert?.title}</p>
          </kry-alert>
        </div>
      </Host>
    );
  }
}
