/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { KryAlert, KryAnchor, KryButtonBold, KryButtonType, KryColor, KryInputType, KryLight, KrySize, KryVariant } from "./utils/types";
import { MenuItem, UserType } from "./composites/sidebar/sidebar.model";
import { AppI18nLang } from "@kry/i18n";
import { KryMapPoint } from "./components/map/map.model";
import { ZoomPanOptions } from "leaflet";
import { News } from "./workspaces/news/news.model";
import { FavoriteSatelliteDetail, FilterSatellites, Satellite } from "./workspaces/satellites/satellites.model";
import { SelectValue } from "./components/select/select.model";
export namespace Components {
    interface KryAlert {
        "block": boolean;
        "color": KryColor;
        "open": boolean;
        "time": number;
        "variant": KryVariant;
    }
    interface KryApp {
        "alert": KryAlert;
        "background": string;
        "hide": boolean;
        "items": any[];
        "language": AppI18nLang;
        "logged": boolean;
        "pathname": string;
        "uniquePages": string[];
        "user": UserType;
    }
    interface KryButton {
        "block": boolean;
        "bold": KryButtonBold;
        "color": KryColor;
        "disable": boolean;
        "light": KryLight;
        "shape": boolean;
        "size": KrySize;
        "type": KryButtonType;
        "variant": KryVariant;
    }
    interface KryCardNews {
        "_id": string;
        "admin": boolean;
        "description": string;
        "image": string;
        "name": string;
    }
    interface KryCardSatellite {
        "azimuth": number;
        "eclipsed": boolean;
        "favorite": boolean;
        "language": AppI18nLang;
        "satlatitude": number;
        "satlongitude": number;
        "satname": string;
        "timestamp": string;
    }
    interface KryCreateNews {
        "alert": KryAlert;
        "content": string;
        "contentMessage": string;
        "description": string;
        "descriptionMessage": string;
        "edit": boolean;
        "font": string;
        "fontMessage": string;
        "image": string;
        "imageMessage": string;
        "isLoading": boolean;
        "isValid": boolean;
        "name": string;
        "nameMessage": string;
    }
    interface KryDialog {
        "fixed"?: boolean;
        "open": boolean;
    }
    interface KryDialogLocation {
        "open": boolean;
    }
    interface KryDialogLogout {
        "icon": string;
        "name": string;
        "open": boolean;
    }
    interface KryDrawer {
        "anchor": KryAnchor;
        "blurShadow": boolean;
        "color": string;
        "open": boolean;
        "shadow": boolean;
        "zIndex": number;
    }
    interface KryDropdown {
        "dropdown": string;
        "left": number;
        "open": boolean;
        "top": number;
    }
    interface KryDropdownItem {
        "active": boolean;
        "hover": boolean;
        "icon": string;
        "name": string;
        "route": string;
    }
    interface KryEditor {
        "invalid": boolean;
        "message": string;
        "value": string;
    }
    interface KryIcon {
        "name": string;
    }
    interface KryInput {
        "color": KryColor;
        "height": number;
        "invalid": boolean;
        "label": string;
        "message": string;
        "placeholder": string;
        "resize": boolean;
        "type": KryInputType;
        "value": string;
    }
    interface KryLoading {
        "message": string;
        "white": boolean;
    }
    interface KryLogin {
        "action": string;
        "background": string;
        "email": string;
        "emailMessage": string;
        "footer": string;
        "icon": string;
        "isInvalid": boolean;
        "isLoading": boolean;
        "labelEmail": string;
        "labelPassword": string;
        "labelUsername": string;
        "password": string;
        "passwordMessage": string;
        "redirect": string;
        "type": 'login' | 'signup';
        "username": string;
        "usernameMessage": string;
    }
    interface KryLogout {
        "avatar": string;
        "email": string;
        "language": AppI18nLang;
        "open": boolean;
        "username": string;
    }
    interface KryMap {
        "altitude"?: number;
        "controls": boolean;
        "homeIcon": string;
        "labelHome": string;
        "latitude": number;
        "layer": string;
        "lines": KryMapPoint[];
        "longitude": number;
        "markHome": boolean;
        "maxZoom": number;
        "minZoom": number;
        "onFly": (latlang: [number, number], zoom?: number, options?: ZoomPanOptions) => Promise<void>;
        "points": KryMapPoint[];
        "resizeMap": () => Promise<void>;
        "trace": boolean;
        "track": boolean;
        "unknowIcon": string;
        "zoom": number;
    }
    interface KryNavbar {
        "logo": string;
    }
    interface KryNews {
        "admin": boolean;
        "isSearch": boolean;
        "loading": boolean;
        "news": News[];
        "search": string;
    }
    interface KryProfile {
    }
    interface KrySatellites {
        "currentFilter": FilterSatellites;
        "favorites": number[];
        "filter": FilterSatellites[];
        "language": AppI18nLang;
        "loading": boolean;
        "loading3D": boolean;
        "location": GeolocationPosition;
        "pathname": string;
        "satellites": Satellite[];
        "search": string;
        "type": '2D' | '3D';
        "view3dIcon": string;
        "view3dlabel": string;
        "viewMapIcon": string;
        "viewMapLabel": string;
    }
    interface KrySearch {
        "color": KryColor;
        "icon": string;
        "invalid": boolean;
        "label": string;
        "loading": boolean;
        "message": string;
        "placeholder": string;
        "type": KryInputType;
        "value": string;
    }
    interface KrySelect {
        "label": string;
        "open": boolean;
        "options": SelectValue[];
        "placeholder": string;
        "value": SelectValue;
    }
    interface KrySidebar {
        "background": string;
        "currentItem": number;
        "items": MenuItem[];
        "language": AppI18nLang;
        "logged": boolean;
        "logo": string;
        "open": boolean;
        "user": UserType;
    }
    interface KrySidebarItem {
        "active": boolean;
        "icon": string;
        "name": string;
        "open": boolean;
        "route": string;
    }
    interface KryThumbNews {
        "description": string;
        "image": string;
        "name": string;
    }
    interface KryToggleEarth {
        "background": string;
        "label": string;
        "view3dIcon": string;
        "view3dlabel": string;
        "viewMapIcon": string;
        "viewMapLabel": string;
    }
    interface KryTrack {
        "favorite": boolean;
        "language": AppI18nLang;
        "loading": boolean;
        "satellite": Satellite;
    }
    interface KryTrackView {
        "azimuth": number;
        "dec": number;
        "eclipsed": boolean;
        "elevation": number;
        "language": AppI18nLang;
        "latitude": number;
        "longitude": number;
        "ra": number;
        "sataltitude": number;
        "timestamp": string;
    }
    interface KryViewNews {
        "news": News;
    }
}
export interface KryAlertCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKryAlertElement;
}
export interface KryAppCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKryAppElement;
}
export interface KryCardNewsCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKryCardNewsElement;
}
export interface KryCardSatelliteCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKryCardSatelliteElement;
}
export interface KryCreateNewsCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKryCreateNewsElement;
}
export interface KryDialogCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKryDialogElement;
}
export interface KryDialogLocationCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKryDialogLocationElement;
}
export interface KryDialogLogoutCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKryDialogLogoutElement;
}
export interface KryDrawerCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKryDrawerElement;
}
export interface KryDropdownCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKryDropdownElement;
}
export interface KryEditorCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKryEditorElement;
}
export interface KryIconCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKryIconElement;
}
export interface KryInputCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKryInputElement;
}
export interface KryLoginCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKryLoginElement;
}
export interface KryLogoutCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKryLogoutElement;
}
export interface KryMapCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKryMapElement;
}
export interface KryNavbarCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKryNavbarElement;
}
export interface KryNewsCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKryNewsElement;
}
export interface KrySatellitesCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKrySatellitesElement;
}
export interface KrySearchCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKrySearchElement;
}
export interface KrySelectCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKrySelectElement;
}
export interface KrySidebarCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKrySidebarElement;
}
export interface KryThumbNewsCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKryThumbNewsElement;
}
export interface KryToggleEarthCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKryToggleEarthElement;
}
export interface KryTrackCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKryTrackElement;
}
export interface KryViewNewsCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKryViewNewsElement;
}
declare global {
    interface HTMLKryAlertElement extends Components.KryAlert, HTMLStencilElement {
    }
    var HTMLKryAlertElement: {
        prototype: HTMLKryAlertElement;
        new (): HTMLKryAlertElement;
    };
    interface HTMLKryAppElement extends Components.KryApp, HTMLStencilElement {
    }
    var HTMLKryAppElement: {
        prototype: HTMLKryAppElement;
        new (): HTMLKryAppElement;
    };
    interface HTMLKryButtonElement extends Components.KryButton, HTMLStencilElement {
    }
    var HTMLKryButtonElement: {
        prototype: HTMLKryButtonElement;
        new (): HTMLKryButtonElement;
    };
    interface HTMLKryCardNewsElement extends Components.KryCardNews, HTMLStencilElement {
    }
    var HTMLKryCardNewsElement: {
        prototype: HTMLKryCardNewsElement;
        new (): HTMLKryCardNewsElement;
    };
    interface HTMLKryCardSatelliteElement extends Components.KryCardSatellite, HTMLStencilElement {
    }
    var HTMLKryCardSatelliteElement: {
        prototype: HTMLKryCardSatelliteElement;
        new (): HTMLKryCardSatelliteElement;
    };
    interface HTMLKryCreateNewsElement extends Components.KryCreateNews, HTMLStencilElement {
    }
    var HTMLKryCreateNewsElement: {
        prototype: HTMLKryCreateNewsElement;
        new (): HTMLKryCreateNewsElement;
    };
    interface HTMLKryDialogElement extends Components.KryDialog, HTMLStencilElement {
    }
    var HTMLKryDialogElement: {
        prototype: HTMLKryDialogElement;
        new (): HTMLKryDialogElement;
    };
    interface HTMLKryDialogLocationElement extends Components.KryDialogLocation, HTMLStencilElement {
    }
    var HTMLKryDialogLocationElement: {
        prototype: HTMLKryDialogLocationElement;
        new (): HTMLKryDialogLocationElement;
    };
    interface HTMLKryDialogLogoutElement extends Components.KryDialogLogout, HTMLStencilElement {
    }
    var HTMLKryDialogLogoutElement: {
        prototype: HTMLKryDialogLogoutElement;
        new (): HTMLKryDialogLogoutElement;
    };
    interface HTMLKryDrawerElement extends Components.KryDrawer, HTMLStencilElement {
    }
    var HTMLKryDrawerElement: {
        prototype: HTMLKryDrawerElement;
        new (): HTMLKryDrawerElement;
    };
    interface HTMLKryDropdownElement extends Components.KryDropdown, HTMLStencilElement {
    }
    var HTMLKryDropdownElement: {
        prototype: HTMLKryDropdownElement;
        new (): HTMLKryDropdownElement;
    };
    interface HTMLKryDropdownItemElement extends Components.KryDropdownItem, HTMLStencilElement {
    }
    var HTMLKryDropdownItemElement: {
        prototype: HTMLKryDropdownItemElement;
        new (): HTMLKryDropdownItemElement;
    };
    interface HTMLKryEditorElement extends Components.KryEditor, HTMLStencilElement {
    }
    var HTMLKryEditorElement: {
        prototype: HTMLKryEditorElement;
        new (): HTMLKryEditorElement;
    };
    interface HTMLKryIconElement extends Components.KryIcon, HTMLStencilElement {
    }
    var HTMLKryIconElement: {
        prototype: HTMLKryIconElement;
        new (): HTMLKryIconElement;
    };
    interface HTMLKryInputElement extends Components.KryInput, HTMLStencilElement {
    }
    var HTMLKryInputElement: {
        prototype: HTMLKryInputElement;
        new (): HTMLKryInputElement;
    };
    interface HTMLKryLoadingElement extends Components.KryLoading, HTMLStencilElement {
    }
    var HTMLKryLoadingElement: {
        prototype: HTMLKryLoadingElement;
        new (): HTMLKryLoadingElement;
    };
    interface HTMLKryLoginElement extends Components.KryLogin, HTMLStencilElement {
    }
    var HTMLKryLoginElement: {
        prototype: HTMLKryLoginElement;
        new (): HTMLKryLoginElement;
    };
    interface HTMLKryLogoutElement extends Components.KryLogout, HTMLStencilElement {
    }
    var HTMLKryLogoutElement: {
        prototype: HTMLKryLogoutElement;
        new (): HTMLKryLogoutElement;
    };
    interface HTMLKryMapElement extends Components.KryMap, HTMLStencilElement {
    }
    var HTMLKryMapElement: {
        prototype: HTMLKryMapElement;
        new (): HTMLKryMapElement;
    };
    interface HTMLKryNavbarElement extends Components.KryNavbar, HTMLStencilElement {
    }
    var HTMLKryNavbarElement: {
        prototype: HTMLKryNavbarElement;
        new (): HTMLKryNavbarElement;
    };
    interface HTMLKryNewsElement extends Components.KryNews, HTMLStencilElement {
    }
    var HTMLKryNewsElement: {
        prototype: HTMLKryNewsElement;
        new (): HTMLKryNewsElement;
    };
    interface HTMLKryProfileElement extends Components.KryProfile, HTMLStencilElement {
    }
    var HTMLKryProfileElement: {
        prototype: HTMLKryProfileElement;
        new (): HTMLKryProfileElement;
    };
    interface HTMLKrySatellitesElement extends Components.KrySatellites, HTMLStencilElement {
    }
    var HTMLKrySatellitesElement: {
        prototype: HTMLKrySatellitesElement;
        new (): HTMLKrySatellitesElement;
    };
    interface HTMLKrySearchElement extends Components.KrySearch, HTMLStencilElement {
    }
    var HTMLKrySearchElement: {
        prototype: HTMLKrySearchElement;
        new (): HTMLKrySearchElement;
    };
    interface HTMLKrySelectElement extends Components.KrySelect, HTMLStencilElement {
    }
    var HTMLKrySelectElement: {
        prototype: HTMLKrySelectElement;
        new (): HTMLKrySelectElement;
    };
    interface HTMLKrySidebarElement extends Components.KrySidebar, HTMLStencilElement {
    }
    var HTMLKrySidebarElement: {
        prototype: HTMLKrySidebarElement;
        new (): HTMLKrySidebarElement;
    };
    interface HTMLKrySidebarItemElement extends Components.KrySidebarItem, HTMLStencilElement {
    }
    var HTMLKrySidebarItemElement: {
        prototype: HTMLKrySidebarItemElement;
        new (): HTMLKrySidebarItemElement;
    };
    interface HTMLKryThumbNewsElement extends Components.KryThumbNews, HTMLStencilElement {
    }
    var HTMLKryThumbNewsElement: {
        prototype: HTMLKryThumbNewsElement;
        new (): HTMLKryThumbNewsElement;
    };
    interface HTMLKryToggleEarthElement extends Components.KryToggleEarth, HTMLStencilElement {
    }
    var HTMLKryToggleEarthElement: {
        prototype: HTMLKryToggleEarthElement;
        new (): HTMLKryToggleEarthElement;
    };
    interface HTMLKryTrackElement extends Components.KryTrack, HTMLStencilElement {
    }
    var HTMLKryTrackElement: {
        prototype: HTMLKryTrackElement;
        new (): HTMLKryTrackElement;
    };
    interface HTMLKryTrackViewElement extends Components.KryTrackView, HTMLStencilElement {
    }
    var HTMLKryTrackViewElement: {
        prototype: HTMLKryTrackViewElement;
        new (): HTMLKryTrackViewElement;
    };
    interface HTMLKryViewNewsElement extends Components.KryViewNews, HTMLStencilElement {
    }
    var HTMLKryViewNewsElement: {
        prototype: HTMLKryViewNewsElement;
        new (): HTMLKryViewNewsElement;
    };
    interface HTMLElementTagNameMap {
        "kry-alert": HTMLKryAlertElement;
        "kry-app": HTMLKryAppElement;
        "kry-button": HTMLKryButtonElement;
        "kry-card-news": HTMLKryCardNewsElement;
        "kry-card-satellite": HTMLKryCardSatelliteElement;
        "kry-create-news": HTMLKryCreateNewsElement;
        "kry-dialog": HTMLKryDialogElement;
        "kry-dialog-location": HTMLKryDialogLocationElement;
        "kry-dialog-logout": HTMLKryDialogLogoutElement;
        "kry-drawer": HTMLKryDrawerElement;
        "kry-dropdown": HTMLKryDropdownElement;
        "kry-dropdown-item": HTMLKryDropdownItemElement;
        "kry-editor": HTMLKryEditorElement;
        "kry-icon": HTMLKryIconElement;
        "kry-input": HTMLKryInputElement;
        "kry-loading": HTMLKryLoadingElement;
        "kry-login": HTMLKryLoginElement;
        "kry-logout": HTMLKryLogoutElement;
        "kry-map": HTMLKryMapElement;
        "kry-navbar": HTMLKryNavbarElement;
        "kry-news": HTMLKryNewsElement;
        "kry-profile": HTMLKryProfileElement;
        "kry-satellites": HTMLKrySatellitesElement;
        "kry-search": HTMLKrySearchElement;
        "kry-select": HTMLKrySelectElement;
        "kry-sidebar": HTMLKrySidebarElement;
        "kry-sidebar-item": HTMLKrySidebarItemElement;
        "kry-thumb-news": HTMLKryThumbNewsElement;
        "kry-toggle-earth": HTMLKryToggleEarthElement;
        "kry-track": HTMLKryTrackElement;
        "kry-track-view": HTMLKryTrackViewElement;
        "kry-view-news": HTMLKryViewNewsElement;
    }
}
declare namespace LocalJSX {
    interface KryAlert {
        "block"?: boolean;
        "color"?: KryColor;
        "onKryClose"?: (event: KryAlertCustomEvent<boolean>) => void;
        "open"?: boolean;
        "time"?: number;
        "variant"?: KryVariant;
    }
    interface KryApp {
        "alert"?: KryAlert;
        "background"?: string;
        "hide"?: boolean;
        "items"?: any[];
        "language"?: AppI18nLang;
        "logged"?: boolean;
        "onKryAlert"?: (event: KryAppCustomEvent<KryAlert>) => void;
        "onKryLogoutApp"?: (event: KryAppCustomEvent<boolean>) => void;
        "onKryRedirect"?: (event: KryAppCustomEvent<string>) => void;
        "pathname"?: string;
        "uniquePages"?: string[];
        "user"?: UserType;
    }
    interface KryButton {
        "block"?: boolean;
        "bold"?: KryButtonBold;
        "color"?: KryColor;
        "disable"?: boolean;
        "light"?: KryLight;
        "shape"?: boolean;
        "size"?: KrySize;
        "type"?: KryButtonType;
        "variant"?: KryVariant;
    }
    interface KryCardNews {
        "_id"?: string;
        "admin"?: boolean;
        "description"?: string;
        "image"?: string;
        "name"?: string;
        "onKryDelete"?: (event: KryCardNewsCustomEvent<boolean>) => void;
        "onKryRedirect"?: (event: KryCardNewsCustomEvent<string>) => void;
    }
    interface KryCardSatellite {
        "azimuth"?: number;
        "eclipsed"?: boolean;
        "favorite"?: boolean;
        "language"?: AppI18nLang;
        "onKryFavoriteSatellite"?: (event: KryCardSatelliteCustomEvent<boolean>) => void;
        "onKryTrackSatellite"?: (event: KryCardSatelliteCustomEvent<boolean>) => void;
        "satlatitude"?: number;
        "satlongitude"?: number;
        "satname"?: string;
        "timestamp"?: string;
    }
    interface KryCreateNews {
        "alert"?: KryAlert;
        "content"?: string;
        "contentMessage"?: string;
        "description"?: string;
        "descriptionMessage"?: string;
        "edit"?: boolean;
        "font"?: string;
        "fontMessage"?: string;
        "image"?: string;
        "imageMessage"?: string;
        "isLoading"?: boolean;
        "isValid"?: boolean;
        "name"?: string;
        "nameMessage"?: string;
        "onKryAlertChange"?: (event: KryCreateNewsCustomEvent<KryAlert>) => void;
        "onKryChangeContent"?: (event: KryCreateNewsCustomEvent<string>) => void;
        "onKryChangeDescription"?: (event: KryCreateNewsCustomEvent<string>) => void;
        "onKryChangeFont"?: (event: KryCreateNewsCustomEvent<string>) => void;
        "onKryChangeImage"?: (event: KryCreateNewsCustomEvent<string>) => void;
        "onKryChangeName"?: (event: KryCreateNewsCustomEvent<string>) => void;
        "onKryFallback"?: (event: KryCreateNewsCustomEvent<boolean>) => void;
        "onKrySubmit"?: (event: KryCreateNewsCustomEvent<boolean>) => void;
    }
    interface KryDialog {
        "fixed"?: boolean;
        "onKryClose"?: (event: KryDialogCustomEvent<boolean>) => void;
        "open"?: boolean;
    }
    interface KryDialogLocation {
        "onKryClose"?: (event: KryDialogLocationCustomEvent<boolean>) => void;
        "onKryRedirect"?: (event: KryDialogLocationCustomEvent<string>) => void;
        "onKryRequestLocation"?: (event: KryDialogLocationCustomEvent<boolean>) => void;
        "open"?: boolean;
    }
    interface KryDialogLogout {
        "icon"?: string;
        "name"?: string;
        "onKryClose"?: (event: KryDialogLogoutCustomEvent<boolean>) => void;
        "onKryConfirm"?: (event: KryDialogLogoutCustomEvent<boolean>) => void;
        "open"?: boolean;
    }
    interface KryDrawer {
        "anchor"?: KryAnchor;
        "blurShadow"?: boolean;
        "color"?: string;
        "onKryClose"?: (event: KryDrawerCustomEvent<boolean>) => void;
        "open"?: boolean;
        "shadow"?: boolean;
        "zIndex"?: number;
    }
    interface KryDropdown {
        "dropdown"?: string;
        "left"?: number;
        "onKryClose"?: (event: KryDropdownCustomEvent<boolean>) => void;
        "open"?: boolean;
        "top"?: number;
    }
    interface KryDropdownItem {
        "active"?: boolean;
        "hover"?: boolean;
        "icon"?: string;
        "name"?: string;
        "route"?: string;
    }
    interface KryEditor {
        "invalid"?: boolean;
        "message"?: string;
        "onKryChange"?: (event: KryEditorCustomEvent<string>) => void;
        "value"?: string;
    }
    interface KryIcon {
        "name"?: string;
        "onKryClick"?: (event: KryIconCustomEvent<boolean>) => void;
    }
    interface KryInput {
        "color"?: KryColor;
        "height"?: number;
        "invalid"?: boolean;
        "label"?: string;
        "message"?: string;
        "onKryChangeValue"?: (event: KryInputCustomEvent<string>) => void;
        "placeholder"?: string;
        "resize"?: boolean;
        "type"?: KryInputType;
        "value"?: string;
    }
    interface KryLoading {
        "message"?: string;
        "white"?: boolean;
    }
    interface KryLogin {
        "action"?: string;
        "background"?: string;
        "email"?: string;
        "emailMessage"?: string;
        "footer"?: string;
        "icon"?: string;
        "isInvalid"?: boolean;
        "isLoading"?: boolean;
        "labelEmail"?: string;
        "labelPassword"?: string;
        "labelUsername"?: string;
        "onKryAuth"?: (event: KryLoginCustomEvent<boolean>) => void;
        "onKryChangeEmail"?: (event: KryLoginCustomEvent<any>) => void;
        "onKryChangePassword"?: (event: KryLoginCustomEvent<any>) => void;
        "onKryChangeUsername"?: (event: KryLoginCustomEvent<any>) => void;
        "onKryRedirect"?: (event: KryLoginCustomEvent<string>) => void;
        "password"?: string;
        "passwordMessage"?: string;
        "redirect"?: string;
        "type"?: 'login' | 'signup';
        "username"?: string;
        "usernameMessage"?: string;
    }
    interface KryLogout {
        "avatar"?: string;
        "email"?: string;
        "language"?: AppI18nLang;
        "onKryDialogLogout"?: (event: KryLogoutCustomEvent<boolean>) => void;
        "onKryRedirect"?: (event: KryLogoutCustomEvent<string>) => void;
        "onKryToggleDropdown"?: (event: KryLogoutCustomEvent<boolean>) => void;
        "open"?: boolean;
        "username"?: string;
    }
    interface KryMap {
        "altitude"?: number;
        "controls"?: boolean;
        "homeIcon"?: string;
        "labelHome"?: string;
        "latitude"?: number;
        "layer"?: string;
        "lines"?: KryMapPoint[];
        "longitude"?: number;
        "markHome"?: boolean;
        "maxZoom"?: number;
        "minZoom"?: number;
        "onKryClickMarkMap"?: (event: KryMapCustomEvent<number>) => void;
        "points"?: KryMapPoint[];
        "trace"?: boolean;
        "track"?: boolean;
        "unknowIcon"?: string;
        "zoom"?: number;
    }
    interface KryNavbar {
        "logo"?: string;
        "onKryOpenDrawer"?: (event: KryNavbarCustomEvent<boolean>) => void;
        "onKryRedirect"?: (event: KryNavbarCustomEvent<string>) => void;
    }
    interface KryNews {
        "admin"?: boolean;
        "isSearch"?: boolean;
        "loading"?: boolean;
        "news"?: News[];
        "onKryChangeSearch"?: (event: KryNewsCustomEvent<string>) => void;
        "onKryDeleteNews"?: (event: KryNewsCustomEvent<string>) => void;
        "onKryRedirect"?: (event: KryNewsCustomEvent<string>) => void;
        "onKrySearch"?: (event: KryNewsCustomEvent<boolean>) => void;
        "search"?: string;
    }
    interface KryProfile {
    }
    interface KrySatellites {
        "currentFilter"?: FilterSatellites;
        "favorites"?: number[];
        "filter"?: FilterSatellites[];
        "language"?: AppI18nLang;
        "loading"?: boolean;
        "loading3D"?: boolean;
        "location"?: GeolocationPosition;
        "onKryChangeSearch"?: (event: KrySatellitesCustomEvent<string>) => void;
        "onKryFallback"?: (event: KrySatellitesCustomEvent<boolean>) => void;
        "onKryFavoriteSatellite"?: (event: KrySatellitesCustomEvent<FavoriteSatelliteDetail>) => void;
        "onKryFilter"?: (event: KrySatellitesCustomEvent<FilterSatellites>) => void;
        "onKryLocation"?: (event: KrySatellitesCustomEvent<false | GeolocationPosition>) => void;
        "onKryRedirect"?: (event: KrySatellitesCustomEvent<string>) => void;
        "onKrySearch"?: (event: KrySatellitesCustomEvent<boolean>) => void;
        "onKryToggleLoading3D"?: (event: KrySatellitesCustomEvent<boolean>) => void;
        "onKryTrackSatellite"?: (event: KrySatellitesCustomEvent<number>) => void;
        "pathname"?: string;
        "satellites"?: Satellite[];
        "search"?: string;
        "type"?: '2D' | '3D';
        "view3dIcon"?: string;
        "view3dlabel"?: string;
        "viewMapIcon"?: string;
        "viewMapLabel"?: string;
    }
    interface KrySearch {
        "color"?: KryColor;
        "icon"?: string;
        "invalid"?: boolean;
        "label"?: string;
        "loading"?: boolean;
        "message"?: string;
        "onKryChangeValue"?: (event: KrySearchCustomEvent<string>) => void;
        "onKrySearch"?: (event: KrySearchCustomEvent<boolean>) => void;
        "placeholder"?: string;
        "type"?: KryInputType;
        "value"?: string;
    }
    interface KrySelect {
        "label"?: string;
        "onKryChange"?: (event: KrySelectCustomEvent<string>) => void;
        "open"?: boolean;
        "options"?: SelectValue[];
        "placeholder"?: string;
        "value"?: SelectValue;
    }
    interface KrySidebar {
        "background"?: string;
        "currentItem"?: number;
        "items"?: MenuItem[];
        "language"?: AppI18nLang;
        "logged"?: boolean;
        "logo"?: string;
        "onKryCloseDrawer"?: (event: KrySidebarCustomEvent<boolean>) => void;
        "onKryLogoutApp"?: (event: KrySidebarCustomEvent<boolean>) => void;
        "onKryRedirect"?: (event: KrySidebarCustomEvent<string>) => void;
        "open"?: boolean;
        "user"?: UserType;
    }
    interface KrySidebarItem {
        "active"?: boolean;
        "icon"?: string;
        "name"?: string;
        "open"?: boolean;
        "route"?: string;
    }
    interface KryThumbNews {
        "description"?: string;
        "image"?: string;
        "name"?: string;
        "onKryRedirect"?: (event: KryThumbNewsCustomEvent<boolean>) => void;
    }
    interface KryToggleEarth {
        "background"?: string;
        "label"?: string;
        "onKryToggleViewEarth"?: (event: KryToggleEarthCustomEvent<'3D' | '2D'>) => void;
        "view3dIcon"?: string;
        "view3dlabel"?: string;
        "viewMapIcon"?: string;
        "viewMapLabel"?: string;
    }
    interface KryTrack {
        "favorite"?: boolean;
        "language"?: AppI18nLang;
        "loading"?: boolean;
        "onKryFallback"?: (event: KryTrackCustomEvent<boolean>) => void;
        "onKryFavoriteSatellite"?: (event: KryTrackCustomEvent<boolean>) => void;
        "onKryLocation"?: (event: KryTrackCustomEvent<false | GeolocationPosition>) => void;
        "onKryRequestTrack"?: (event: KryTrackCustomEvent<boolean>) => void;
        "onKryTrackSatellite"?: (event: KryTrackCustomEvent<boolean>) => void;
        "satellite"?: Satellite;
    }
    interface KryTrackView {
        "azimuth"?: number;
        "dec"?: number;
        "eclipsed"?: boolean;
        "elevation"?: number;
        "language"?: AppI18nLang;
        "latitude"?: number;
        "longitude"?: number;
        "ra"?: number;
        "sataltitude"?: number;
        "timestamp"?: string;
    }
    interface KryViewNews {
        "news"?: News;
        "onKryFallback"?: (event: KryViewNewsCustomEvent<boolean>) => void;
    }
    interface IntrinsicElements {
        "kry-alert": KryAlert;
        "kry-app": KryApp;
        "kry-button": KryButton;
        "kry-card-news": KryCardNews;
        "kry-card-satellite": KryCardSatellite;
        "kry-create-news": KryCreateNews;
        "kry-dialog": KryDialog;
        "kry-dialog-location": KryDialogLocation;
        "kry-dialog-logout": KryDialogLogout;
        "kry-drawer": KryDrawer;
        "kry-dropdown": KryDropdown;
        "kry-dropdown-item": KryDropdownItem;
        "kry-editor": KryEditor;
        "kry-icon": KryIcon;
        "kry-input": KryInput;
        "kry-loading": KryLoading;
        "kry-login": KryLogin;
        "kry-logout": KryLogout;
        "kry-map": KryMap;
        "kry-navbar": KryNavbar;
        "kry-news": KryNews;
        "kry-profile": KryProfile;
        "kry-satellites": KrySatellites;
        "kry-search": KrySearch;
        "kry-select": KrySelect;
        "kry-sidebar": KrySidebar;
        "kry-sidebar-item": KrySidebarItem;
        "kry-thumb-news": KryThumbNews;
        "kry-toggle-earth": KryToggleEarth;
        "kry-track": KryTrack;
        "kry-track-view": KryTrackView;
        "kry-view-news": KryViewNews;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "kry-alert": LocalJSX.KryAlert & JSXBase.HTMLAttributes<HTMLKryAlertElement>;
            "kry-app": LocalJSX.KryApp & JSXBase.HTMLAttributes<HTMLKryAppElement>;
            "kry-button": LocalJSX.KryButton & JSXBase.HTMLAttributes<HTMLKryButtonElement>;
            "kry-card-news": LocalJSX.KryCardNews & JSXBase.HTMLAttributes<HTMLKryCardNewsElement>;
            "kry-card-satellite": LocalJSX.KryCardSatellite & JSXBase.HTMLAttributes<HTMLKryCardSatelliteElement>;
            "kry-create-news": LocalJSX.KryCreateNews & JSXBase.HTMLAttributes<HTMLKryCreateNewsElement>;
            "kry-dialog": LocalJSX.KryDialog & JSXBase.HTMLAttributes<HTMLKryDialogElement>;
            "kry-dialog-location": LocalJSX.KryDialogLocation & JSXBase.HTMLAttributes<HTMLKryDialogLocationElement>;
            "kry-dialog-logout": LocalJSX.KryDialogLogout & JSXBase.HTMLAttributes<HTMLKryDialogLogoutElement>;
            "kry-drawer": LocalJSX.KryDrawer & JSXBase.HTMLAttributes<HTMLKryDrawerElement>;
            "kry-dropdown": LocalJSX.KryDropdown & JSXBase.HTMLAttributes<HTMLKryDropdownElement>;
            "kry-dropdown-item": LocalJSX.KryDropdownItem & JSXBase.HTMLAttributes<HTMLKryDropdownItemElement>;
            "kry-editor": LocalJSX.KryEditor & JSXBase.HTMLAttributes<HTMLKryEditorElement>;
            "kry-icon": LocalJSX.KryIcon & JSXBase.HTMLAttributes<HTMLKryIconElement>;
            "kry-input": LocalJSX.KryInput & JSXBase.HTMLAttributes<HTMLKryInputElement>;
            "kry-loading": LocalJSX.KryLoading & JSXBase.HTMLAttributes<HTMLKryLoadingElement>;
            "kry-login": LocalJSX.KryLogin & JSXBase.HTMLAttributes<HTMLKryLoginElement>;
            "kry-logout": LocalJSX.KryLogout & JSXBase.HTMLAttributes<HTMLKryLogoutElement>;
            "kry-map": LocalJSX.KryMap & JSXBase.HTMLAttributes<HTMLKryMapElement>;
            "kry-navbar": LocalJSX.KryNavbar & JSXBase.HTMLAttributes<HTMLKryNavbarElement>;
            "kry-news": LocalJSX.KryNews & JSXBase.HTMLAttributes<HTMLKryNewsElement>;
            "kry-profile": LocalJSX.KryProfile & JSXBase.HTMLAttributes<HTMLKryProfileElement>;
            "kry-satellites": LocalJSX.KrySatellites & JSXBase.HTMLAttributes<HTMLKrySatellitesElement>;
            "kry-search": LocalJSX.KrySearch & JSXBase.HTMLAttributes<HTMLKrySearchElement>;
            "kry-select": LocalJSX.KrySelect & JSXBase.HTMLAttributes<HTMLKrySelectElement>;
            "kry-sidebar": LocalJSX.KrySidebar & JSXBase.HTMLAttributes<HTMLKrySidebarElement>;
            "kry-sidebar-item": LocalJSX.KrySidebarItem & JSXBase.HTMLAttributes<HTMLKrySidebarItemElement>;
            "kry-thumb-news": LocalJSX.KryThumbNews & JSXBase.HTMLAttributes<HTMLKryThumbNewsElement>;
            "kry-toggle-earth": LocalJSX.KryToggleEarth & JSXBase.HTMLAttributes<HTMLKryToggleEarthElement>;
            "kry-track": LocalJSX.KryTrack & JSXBase.HTMLAttributes<HTMLKryTrackElement>;
            "kry-track-view": LocalJSX.KryTrackView & JSXBase.HTMLAttributes<HTMLKryTrackViewElement>;
            "kry-view-news": LocalJSX.KryViewNews & JSXBase.HTMLAttributes<HTMLKryViewNewsElement>;
        }
    }
}
