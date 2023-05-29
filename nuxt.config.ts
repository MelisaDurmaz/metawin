export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  components: [
    { path: "~/components/shared", prefix: "Shared" },
    "~/components",
  ],
});
