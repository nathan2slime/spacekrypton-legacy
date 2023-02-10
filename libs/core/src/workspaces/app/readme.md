# kry-app

<!-- Auto Generated Below -->

## Properties

| Property      | Attribute    | Description | Type                                                                                                                                                                                           | Default     |
| ------------- | ------------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `alert`       | --           |             | `{ color: KryColor; open: boolean; title?: string; }`                                                                                                                                          | `undefined` |
| `background`  | `background` |             | `string`                                                                                                                                                                                       | `undefined` |
| `hide`        | `hide`       |             | `boolean`                                                                                                                                                                                      | `undefined` |
| `items`       | --           |             | `any[]`                                                                                                                                                                                        | `[]`        |
| `language`    | `language`   |             | `"en" \| "pt-BR"`                                                                                                                                                                              | `'en'`      |
| `logged`      | `logged`     |             | `boolean`                                                                                                                                                                                      | `undefined` |
| `pathname`    | `pathname`   |             | `string`                                                                                                                                                                                       | `undefined` |
| `uniquePages` | --           |             | `string[]`                                                                                                                                                                                     | `[]`        |
| `user`        | --           |             | `{ id?: string; email?: string; avatar?: string; created_at?: string; updated_at?: string; deleted_at?: string; satellites?: number[]; thumb?: string; roles?: string[]; username?: string; }` | `undefined` |

## Events

| Event          | Description | Type                                                               |
| -------------- | ----------- | ------------------------------------------------------------------ |
| `kryAlert`     |             | `CustomEvent<{ color: KryColor; open: boolean; title?: string; }>` |
| `kryLogoutApp` |             | `CustomEvent<boolean>`                                             |
| `kryRedirect`  |             | `CustomEvent<string>`                                              |

## Dependencies

### Depends on

- [kry-sidebar](../../composites/sidebar)
- [kry-icon](../../components/icon)
- [kry-drawer](../../components/drawer)
- [kry-navbar](../../components/navbar)
- [kry-alert](../../components/alert)

### Graph

```mermaid
graph TD;
  kry-app --> kry-sidebar
  kry-app --> kry-icon
  kry-app --> kry-drawer
  kry-app --> kry-navbar
  kry-app --> kry-alert
  kry-sidebar --> kry-dialog-logout
  kry-sidebar --> kry-icon
  kry-sidebar --> kry-sidebar-item
  kry-sidebar --> kry-dropdown
  kry-sidebar --> kry-dropdown-item
  kry-sidebar --> kry-logout
  kry-sidebar --> kry-button
  kry-dialog-logout --> kry-dialog
  kry-dialog-logout --> kry-icon
  kry-dialog-logout --> kry-button
  kry-sidebar-item --> kry-icon
  kry-dropdown-item --> kry-icon
  kry-logout --> kry-dropdown
  kry-logout --> kry-dropdown-item
  kry-logout --> kry-icon
  kry-navbar --> kry-icon
  style kry-app fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
