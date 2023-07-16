<script lang="ts">
	import { isLocaleLoaded } from '$lib/i18n';
  import { _, locale, time, date, number, locales } from 'svelte-i18n';

  let value: string = 'en';
  let randomNumber = 0;

  function handleLocaleChange(event: any) {
    event.preventDefault();
    value = event?.target?.value;
    $locale = value;
  }

  function generatePluralString() {
    randomNumber = Math.floor(Math.random() * (3+1 - 0) + 0);
  }
</script>

<div class="container">
  {#if $isLocaleLoaded}
    <div class="container__title">
      <h1>{$_('heading')}</h1>
    </div>
    <div class="container__toggle">
      <span>{$_('toggle_label')}: </span>
      <select {value} on:change={handleLocaleChange}>
        <option value="en" selected>English</option>
        <option value="hi">Hindi</option>
        <option value="fr">French</option>
      </select>

      <!-- <select bind:value={$locale}>
        {#each $locales as locale, i}
          {#if i === 0}
            <option value={locale} selected>{locale.toUpperCase()}</option>
          {:else}
            <option value={locale}>{locale.toUpperCase()}</option>
          {/if}
        {/each}
      </select> -->
    </div>
    <div class="container__content">
      <p>{$_('body_text', {
        values: {
          download: $number(30242),
          date: $date(Date.UTC(2023, 6, 14, 0, 0, 0, 0), { year: "numeric", month: "long", day: "numeric" })
        }
      })}</p>

      <div class="container__content__plural">
        <button on:click={generatePluralString}>{$_('button_label')}</button>
        <span>{$_('awards', { values: { n: randomNumber } })}</span>
      </div>

      <div class="container__content__formatter">
        <span><strong>Time: </strong>{$time(new Date(), { hour: "numeric", minute: "numeric", second: "numeric" })}</span>
        <span><strong>Date: </strong>{$date(new Date(), { year: "numeric", month: "long", day: "numeric" })}</span>
        <span><strong>Currency: </strong>{$number(2, { style: "currency", currency: "INR" })}</span>
      </div>
    </div>
  {:else}
    <div class="container__content">Locale initializing...</div>
  {/if}
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    margin: 1rem;

    &__title {
      display: flex;
      justify-content: center;
    }

    &__toggle {
      padding: 0 1rem;
      font-size: 1.4rem;
      line-height: 2rem;

      select {
        padding: 0.25rem;
        font-size: 1rem;
        margin-left: 1rem;
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      padding: 0 1rem;
      font-size: 1.4rem;
      line-height: 2rem;
      text-align: justify;

      &__plural {
        display: flex;
        margin: 1rem 0;
        
        button {
          margin-right: 2rem;
        }
      }

      &__formatter {
        display: flex;
        flex-direction: column;
        margin-top: 1rem;
      }
    }
  }
</style>
