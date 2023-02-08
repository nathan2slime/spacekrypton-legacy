# kry-card-satellite

<!-- Auto Generated Below -->

## Properties

| Property       | Attribute      | Description | Type              | Default     |
| -------------- | -------------- | ----------- | ----------------- | ----------- |
| `azimuth`      | `azimuth`      |             | `number`          | `undefined` |
| `eclipsed`     | `eclipsed`     |             | `boolean`         | `undefined` |
| `favorite`     | `favorite`     |             | `boolean`         | `undefined` |
| `language`     | `language`     |             | `"en" \| "pt-BR"` | `undefined` |
| `satlatitude`  | `satlatitude`  |             | `number`          | `undefined` |
| `satlongitude` | `satlongitude` |             | `number`          | `undefined` |
| `satname`      | `satname`      |             | `string`          | `undefined` |
| `timestamp`    | `timestamp`    |             | `string`          | `undefined` |

## Events

| Event                  | Description | Type                   |
| ---------------------- | ----------- | ---------------------- |
| `kryFavoriteSatellite` |             | `CustomEvent<boolean>` |
| `kryTrackSatellite`    |             | `CustomEvent<boolean>` |

## Dependencies

### Used by

- [kry-satellites](../../workspaces/satellites)

### Depends on

- [kry-icon](../icon)

### Graph

```mermaid
graph TD;
  kry-card-satellite --> kry-icon
  kry-satellites --> kry-card-satellite
  style kry-card-satellite fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
