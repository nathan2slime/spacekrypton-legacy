# kry-card-news

<!-- Auto Generated Below -->

## Properties

| Property      | Attribute     | Description | Type      | Default     |
| ------------- | ------------- | ----------- | --------- | ----------- |
| `_id`         | `_id`         |             | `string`  | `undefined` |
| `admin`       | `admin`       |             | `boolean` | `undefined` |
| `description` | `description` |             | `string`  | `undefined` |
| `image`       | `image`       |             | `string`  | `undefined` |
| `name`        | `name`        |             | `string`  | `undefined` |

## Events

| Event         | Description | Type                   |
| ------------- | ----------- | ---------------------- |
| `kryDelete`   |             | `CustomEvent<boolean>` |
| `kryRedirect` |             | `CustomEvent<string>`  |

## Dependencies

### Used by

- [kry-news](../../workspaces/news)

### Depends on

- [kry-icon](../icon)
- [kry-dropdown](../dropdown)
- [kry-dropdown-item](../dropdown-item)

### Graph

```mermaid
graph TD;
  kry-card-news --> kry-icon
  kry-card-news --> kry-dropdown
  kry-card-news --> kry-dropdown-item
  kry-dropdown-item --> kry-icon
  kry-news --> kry-card-news
  style kry-card-news fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
