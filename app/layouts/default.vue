<template>
  <div class="default-layout">
    <header>
      <h1>Default Layout Header</h1>
    </header>

    <main>
      <slot />
    </main>

    <footer>
      <h1>Default Layout Footer</h1>
    </footer>
  </div>
</template>

<style lang="scss">
.default-layout {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  padding: 40px;

  header,
  footer {
    padding: 15px;
    text-align: center;
  }

  main {
    flex: 1 1 auto;
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>
