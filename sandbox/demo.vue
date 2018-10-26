<template>
  <div>
    <h1>Loading</h1>
    <bit-loading></bit-loading>

    <h1>Accordion</h1>
    <smart-accordion>
      <h2>Hello</h2>
    </smart-accordion>

    <h1>Details</h1>
    <smart-details :detail-data="{ name: 'James', birthday: new Date() }"></smart-details>

    <h1>Form</h1>
    <smart-form :form-data="{ Name: String, Age: Number }"
                :form-loading="working"
                :on-submit="submit"
                :validation-errors="errors">
    </smart-form>

    <h1>Searchable Table</h1>
    <stack-searchable-table form-title="Test"
                            route-name="test"
                            :table-data="[
                                  { id: 1, Name: 'James', Age: 25, birthday: new Date() },
                                  { id: 2, Name: 'Joel', Age: 20, birthday: new Date() },
                                  { id: 3, Name: 'Jenna', Age: 23, birthday: new Date() }
                                ]"
                            default-context="test"
                            :searchModel="searchModel">
    </stack-searchable-table>

    <h1>Section</h1>
    <smart-section section-title="Test">
      <h2>Hello</h2>
    </smart-section>

    <h1>Tabs</h1>
    <smart-tabs>

      <bit-tab slot="tab-list">Tab 1</bit-tab>
      <bit-tab slot="tab-list">Tab 2</bit-tab>

      <bit-tab slot="tab-content" :is-tab-content="true">Asdf</bit-tab>
      <bit-tab slot="tab-content" :is-tab-content="true">
        <smart-details :detail-data="{ name: 'James' }"></smart-details>
      </bit-tab>

    </smart-tabs>
  </div>
</template>

<script>
export default {
  name: 'demo',
  components: {
    BitTab: () => import('../src/components/bit-tab'),
    SmartTabs: () => import('../src/components/smart-tabs'),
    SmartDetails: () => import('../src/components/smart-details'),
    SmartAccordion: () => import('../src/components/smart-accordion'),
    BitLoading: () => import('../src/components/bit-loading'),
    SmartSection: () => import('../src/components/smart-section'),
    SmartForm: () => import('../src/components/smart-form'),
    StackSearchableTable: () => import('../src/components/stack-searchableTable'),
  },
  // computed: {
  //   propsToLink() {
  //     return {
  //       manufacturerName: createLinkToRecord({
  //         linkContext: 'Manufacturer',
  //         linkAction: 'Details',
  //         destinationLookupKey: 'name',
  //         destinationTable: this.getPeople,
  //         destinationIdKey: '_id'
  //       })
  //     };
  //   }
  // },
  data() {
    return {
      devices: [
        { id: 1, deviceModel: 'TEST', manufacturerName: 'James' },
        { id: 2, deviceModel: 'ANOTHER', manufacturerName: 'James' },
        { id: 3, deviceModel: 'More', manufacturerName: 'Smart Start' },
        { id: 4, deviceModel: 'Device 1', manufacturerName: 'Draeger' },
        { id: 5, deviceModel: 'Device 2', manufacturerName: 'Smart Start' },
        { id: 6, deviceModel: 'Device 3', manufacturerName: 'Manufacturer 3' },
      ],
      errors: [],
      formData: {
        name: String,
        age: Number,
        child: ['James', 'Jesse', 'Jackson', 'Jason'],
        isEmployee: Boolean,
        birthday: Date,
      },
      searchModel: {
        Name: String,
        Age: Number,
      },
      textModel: '',
      dateModel: new Date(),
      working: false,
      count: 0,
    };
  },
  methods: {
    async submit(submittedData) {
      console.log(submittedData);
      this.working = true;
      await this.delay(3000);
      if (this.count > 0) {
        this.count -= 1;
        this.errors = [
          {
            fieldName: 'Name',
            message: 'Name must be ten million characters in length.',
          },
          {
            fieldName: 'Age',
            message: 'You must be this old to play the game',
          },
          {
            fieldName: null,
            message: 'Network Error',
          },
        ];
      } else {
        this.count += 1;
        this.errors = [
          {
            fieldName: 'Age',
            message: 'You must be this old to play the game',
          },
        ];
      }
      this.working = false;
    },
    delay(time, value) {
      return new Promise((resolve) => {
        setTimeout(resolve.bind(null, value), time);
      });
    },
  },
};
</script>

<style scoped>
</style>
