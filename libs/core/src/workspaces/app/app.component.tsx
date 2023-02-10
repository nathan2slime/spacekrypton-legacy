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
  Element,
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
  @Prop() pathname: string;
  @Prop() alert: KryAlert;
  @Prop() uniquePages: string[] = [];
  @Prop() hide: boolean;
  @Prop() items = [];

  @State() drawer: boolean;
  @State() sidebar: boolean;
  @State() currentItem: number = 0;

  @Event({ composed: false }) kryRedirect: EventEmitter<string>;
  @Event({ composed: false }) kryLogoutApp: EventEmitter<boolean>;
  @Event({ composed: false }) kryAlert: EventEmitter<KryAlert>;

  @Element() host: HTMLKryAppElement;

  @Listen('setAppAlert', { target: 'document' })
  listenAlert(e: CustomEvent<KryAlert>) {
    this.kryAlert.emit(e.detail);
  }

  @Watch('pathname')
  listenPathname() {
    const position = this.items.findIndex(item => item.route == this.pathname);

    this.currentItem = position == -1 ? 0 : position;
  }

  @Watch('language')
  loadItems() {
    const i18n = langs[this.language].web.sidebar;

    this.items = [
      {
        name: i18n.satellites,
        route: '/',
        icon: 'ri-global-',
      },
      {
        name: i18n.news,
        route: '/news',
        icon: 'ri-newspaper-',
      },
    ];
  }

  callSidebar = (collapsed: boolean) => (
    <kry-sidebar
      logo="/logo.png"
      user={this.user}
      logged={this.logged}
      open={collapsed ? this.sidebar : true}
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
          {this.hide && (
            <div class={{ sidebar: true, open: this.sidebar }}>
              <button onClick={() => (this.sidebar = !this.sidebar)}>
                <kry-icon name="ri-arrow-left-s-line" />
              </button>

              {this.callSidebar(true)}
            </div>
          )}

          <kry-drawer
            anchor="left"
            blurShadow
            open={this.drawer}
            zIndex={11}
            onKryClose={() => (this.drawer = false)}
          >
            {this.hide && this.callSidebar(false)}
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
