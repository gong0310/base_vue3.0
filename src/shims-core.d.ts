import { ComponentCustomProperties } from "vue";

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
      $message: string,
    }
}