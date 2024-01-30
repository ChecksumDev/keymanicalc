<script setup lang="ts">
import { ref } from 'vue'

const emotes = ref(0) // number of emotes
const discount = ref(0) // discount percentage

const emoteRate = ref(15)
const discountRate = ref(10)
const discountThreshold = ref(10)
const discountInterval = ref(5)
const maxDiscount = ref(50)


const packages = [
  { emotes: 1, price: 15 },
  { emotes: 3, price: 40 },
  { emotes: 6, price: 75 }
]

const calculate = () => {
  // If the number of emotes is in the pre-defined packages, return the package price
  const packagePrice = packages.find(pkg => pkg.emotes === emotes.value)?.price
  if (packagePrice) return packagePrice

  // If the number of emotes is less than the discount threshold, return the original price
  if (emotes.value < discountThreshold.value) return emotes.value * emoteRate.value

  // Calculate the discount
  const discountCount = Math.floor((emotes.value - discountThreshold.value) / discountInterval.value)
  const discountValue = discountCount * discountRate.value
  discount.value = Math.min(discountValue, maxDiscount.value)

  // Return the discounted price
  return Math.floor(emotes.value * emoteRate.value * (1 - discount.value / 100))
}

const reset = () => {
  discount.value = 0
  emoteRate.value = 15
  discountRate.value = 5
  discountThreshold.value = 3
  discountInterval.value = 3
  maxDiscount.value = 50
}

const export_json = () => {
  const data = {
    emoteRate: emoteRate.value,
    discountRate: discountRate.value,
    discountThreshold: discountThreshold.value,
    discountInterval: discountInterval.value,
    maxDiscount: maxDiscount.value
  }

  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }))
  a.setAttribute('download', 'rates.json')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

</script>

<template>
  <main class="flex items-center justify-center h-screen bg-dark-800">
    <!-- calculator -->
    <div class="flex flex-col items-center bg-dark-900 p-8 rounded-lg">
      <h1 class="text-3xl font-semibold mb-4">Commission Rate Calculator</h1>
      <!-- user input -->
      <div class="flex items-center mb-4">
        <label class="mr-4">Number of Emotes</label>
        <input type="number" min="0" class="p-2 rounded-md bg-dark-800 text-dark-100" v-model="emotes" />
      </div>
      <!-- result -->
      <div class="flex items-center mb-4">
        <label class="mr-4">Total Price</label>
        <span class="text-2xl font-semibold text-dark-100">${{ calculate() }}</span>
      </div>
      <!-- discount info -->
      <span class="text-dark-300 ml-2" v-if="packages.some(pkg => pkg.emotes === emotes)">No discount applied for
        pre-defined packages</span>
      <span class="text-dark-300 ml-2" v-else-if="discount > 0">original price: ${{ emotes * emoteRate }}, discount: {{
        discount }}%</span>
      <span class="text-dark-300 ml-2" v-else>No discount applied</span>
    </div>

    <!-- debugging tools on the very left of the flex column -->
    <div id="debugging-tools" class="absolute left-0 top-0 p-4">
      <div class="bg-dark-900 p-4 rounded-lg">
        <h2 class="text-2xl font-semibold mb-4">Debugging Tools</h2>

        <!-- rate -->
        <div class="flex flex-col mb-4">
          <label class="mb-2 cursor-help" title="The rate at which you charge for each emote">Rate</label>
          <input type="number" min="0" class="p-2 rounded-md bg-dark-800 text-dark-100" v-model="emoteRate" />
        </div>

        <!-- discount rate -->
        <div class="flex flex-col mb-4">
          <label class="mb-2 cursor-help"
            title="The percentage of discount you offer for every 3 emotes after the threshold">Discount Rate</label>
          <input type="number" min="0" max="100" class="p-2 rounded-md bg-dark-800 text-dark-100"
            v-model="discountRate" />
        </div>

        <!-- discount threshold -->
        <div class="flex flex-col mb-4">
          <label class="mb-2 cursor-help" title="The number of emotes required to be eligible for a discount">Discount
            Threshold</label>
          <input type="number" min="0" class="p-2 rounded-md bg-dark-800 text-dark-100" v-model="discountThreshold" />
        </div>

        <!-- discount interval -->
        <div class="flex flex-col mb-4">
          <label class="mb-2 cursor-help"
            title="Every {{ discountInterval }} emotes after the threshold, you get an additional {{ discountRate }}% discount">Discount
            Interval</label>
          <input type="number" min="0" class="p-2 rounded-md bg-dark-800 text-dark-100" v-model="discountInterval" />
        </div>

        <!-- max discount -->
        <div class="flex flex-col mb-4">
          <label class="mb-2 cursor-help" title="The maximum discount percentage you offer">Max Discount</label>
          <input type="number" min="0" max="100" class="p-2 rounded-md bg-dark-800 text-dark-100" v-model="maxDiscount" />
        </div>

        <!-- export and reset buttons -->
        <div class="flex justify-between">
          <button class="p-2 bg-dark-700 text-dark-100 rounded-md" @click="export_json">Export</button>
          <button class="p-2 bg-dark-700 text-dark-100 rounded-md" @click="reset">Reset</button>
        </div>
      </div>
    </div>
  </main>
</template>
