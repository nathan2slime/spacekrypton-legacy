# kry-news

<!-- Auto Generated Below -->

## Properties

| Property   | Attribute   | Description | Type      | Default     |
| ---------- | ----------- | ----------- | --------- | ----------- |
| `admin`    | `admin`     |             | `boolean` | `undefined` |
| `isSearch` | `is-search` |             | `boolean` | `undefined` |
| `loading`  | `loading`   |             | `boolean` | `undefined` |
| `news`     | --          |             | `News[]`  | `[]`        |
| `search`   | `search`    |             | `string`  | `undefined` |

## Events

| Event             | Description | Type                   |
| ----------------- | ----------- | ---------------------- |
| `kryChangeSearch` |             | `CustomEvent<string>`  |
| `kryDeleteNews`   |             | `CustomEvent<string>`  |
| `kryRedirect`     |             | `CustomEvent<string>`  |
| `krySearch`       |             | `CustomEvent<boolean>` |

## Dependencies

### Depends on

- [kry-dialog-logout](../../composites/dialog-logout)
- [kry-icon](../../components/icon)
- [kry-search](../../components/search)
- [kry-button](../../components/button)
- [kry-thumb-news](../../components/thumb-news)
- [kry-card-news](../../components/card-news)

### Graph

```mermaid
graph TD;
  kry-news --> kry-dialog-logout
  kry-news --> kry-icon
  kry-news --> kry-search
  kry-news --> kry-button
  kry-news --> kry-thumb-news
  kry-news --> kry-card-news
  kry-dialog-logout --> kry-dialog
  kry-dialog-logout --> kry-icon
  kry-dialog-logout --> kry-button
  kry-search --> kry-icon
  kry-card-news --> kry-icon
  kry-card-news --> kry-dropdown
  kry-card-news --> kry-dropdown-item
  kry-dropdown-item --> kry-icon
  style kry-news fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
