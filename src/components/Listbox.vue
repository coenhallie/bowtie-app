<template>
  <div>
    <Listbox v-model="selectedThreatActor">
      <div class="relative mt-1">
        <ListboxButton
          class="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500"
        >
          <span class="block truncate">{{ selectedThreatActor.name }}</span>
          <span
            class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
          >
            <SelectorIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute w-full py-1 mt-1 text-base bg-white rounded-md shadow max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="threatActor in threatActors"
              :key="threatActor.name"
              :value="threatActor"
              as="template"
            >
              <li
                :class="[
                  active ? 'text-amber-900 bg-blue-100' : 'text-gray-900',
                  'cursor-pointer select-none relative py-2 pl-10 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                  >{{ threatActor.name }}</span
                >
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                >
                  <CheckIcon class="w-5 h-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script>
import { ref, emit } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'

export default {
  components: {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    CheckIcon,
    SelectorIcon,
  },
  emits: ['selectedThreatActor'],
  setup() {
    const threatActors = [
      { name: 'Organized Cybercriminals' },
      { name: 'Cyber Terrorists' },
      { name: 'Inside Agents and Bad Actors' },
      { name: 'State-Sponsored Threat Agents' },
      { name: 'Script Kiddies' },
      { name: 'Hacktivists' },
      { name: 'Human Error' },
    ]
    const selectedThreatActor = ref(threatActors[0])

    return {
      threatActors,
      selectedThreatActor,
      emit,
    }
  },
}
</script>
