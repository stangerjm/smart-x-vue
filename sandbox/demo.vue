<template>
  <div>
    <!--<h1>Expandable Section</h1>-->
    <!--<block-expandable-section is-expanded>-->
      <!--<h1>Hello there</h1>-->
    <!--</block-expandable-section>-->

    <!--<h1>Loading</h1>-->

    <!--<h2>Bit Loading</h2>-->
    <!--<bit-loading></bit-loading>-->

    <!--<h2>Smart Loading</h2>-->
    <!--<smart-loading loading>-->
      <!--<smart-form :form-data="formData"-->
                  <!--:on-submit="function () {}">-->
      <!--</smart-form>-->
    <!--</smart-loading>-->

    <!--<h1>Accordion</h1>-->
    <!--<smart-accordion title="Devices">-->
      <!--<smart-table :table-data="getDevices"-->
                   <!--default-context="test">-->
      <!--</smart-table>-->
    <!--</smart-accordion>-->

    <!--<h1>Details</h1>-->
    <!--<smart-details :detail-data="{-->
        <!--date: new Date(),-->
        <!--utcDate: new Date().toUTCString(),-->
        <!--isoDate: new Date().toISOString(),-->
        <!--dotNetMVCJsonDate: '/Date(1541539613000)',-->
        <!--dotNetAPIJsonDate: '2002-02-02T00:00:00',-->
        <!--validDateString: '01/01/2001',-->
        <!--invalidDateString: '01-01-2001',-->
        <!--wordThenNumber: 'Device 21',-->
        <!--stringLikeYear: '2001',-->
        <!--numberLikeYear: 2001,-->
        <!--numberLikeDate: 1541539613000,-->
        <!--stringLikeYearThenWords: '2014 units of paper',-->
        <!--wordsThenStringLikeYear: 'more words 2014'-->
      <!--}"-->
      <!--:details-per-column="20"></smart-details>-->

    <!--<h1>Messages</h1>-->
    <!--<block-messages :messages="messages"-->
                    <!--message-type="error">-->
    <!--</block-messages>-->

    <!--&lt;!&ndash;<h2>Details: Outlined</h2>&ndash;&gt;-->
    <!--&lt;!&ndash;<smart-details :detail-data="{ name: 'James', birthday: new Date() }" outlined></smart-details>&ndash;&gt;-->

    <!--<h1>Form</h1>-->
    <!--<smart-form :form-data="formData"-->
                <!--:on-submit="submit"-->
                <!--:validation-errors="errors">-->
    <!--</smart-form>-->

    <h1>Searchable Table</h1>
    <stack-searchable-table form-title="Test"
                            route-name="test"
                            :table-data="[
                                  { id: 1, Name: 'James', Age: 25, birthday: '01/01/2001' },
                                  { id: 2, Name: 'Joel', Age: 20, birthday: '01/01/2003' },
                                  { id: 3, Name: 'Jenna', Age: 23, birthday: '01/01/2002' }
                                ]"
                            include-action-container
                            default-context="test"
                            :searchModel="searchModel">

      <router-link slot="search-action" to="/add">
        <bit-btn btn-size="large" style="margin-right: 10px;">Add</bit-btn>
      </router-link>

      <router-link slot="search-action" to="/clear">
        <bit-btn btn-size="large">Clear</bit-btn>
      </router-link>

    </stack-searchable-table>

    <!--<h1>Section</h1>-->
    <!--<smart-section section-title="Test">-->
      <!--<h2>Hello</h2>-->
    <!--</smart-section>-->

    <!--<h1>Table</h1>-->
    <!--<smart-table :table-data="devices"-->
                 <!--default-context="testTable"-->
                 <!--includeActionContainer-->
                 <!--idKey="deviceId"-->
                 <!--:props-to-link="propsToLink">-->
      <!--<template slot="action-container" slot-scope="{ getActionPath, itemId }">-->
        <!--<router-link :to="getActionPath('test', 'edit', itemId)">Edit</router-link>-->
        <!--<router-link :to="getActionPath('test', 'delete', itemId)">Delete</router-link>-->
        <!--<router-link :to="getActionPath('test', 'details', itemId)">Details</router-link>-->
      <!--</template>-->
    <!--</smart-table>-->

    <!--<h1>Tabs</h1>-->
    <!--<smart-tabs :tabs="['TabOne', 'TabTwo', 'TabThree']" :current-tab="2">-->
      <!--<h1>Title</h1>-->
      <!--<smart-table slot="TabOne" :table-data="devices" default-context="Test"></smart-table>-->
      <!--<smart-details slot="TabTwo" :detail-data="james"></smart-details>-->
      <!--<smart-form slot="TabThree" :form-data="person" :on-submit="addNewPerson"></smart-form>-->
    <!--</smart-tabs>-->

    <!--<h1>Cards</h1>-->
    <!--<div class="demo-grid">-->
      <!--<smart-card card-title="ITS3"-->
                  <!--card-description="He is a developer."-->
                  <!--is-expanded>-->
        <!--<template slot="card-content">-->
          <!--<smart-details title="James"-->
                         <!--:detail-data="{ name: 'James', birthday: new Date() }">-->
          <!--</smart-details>-->
        <!--</template>-->
        <!--<bit-icon slot="card-actions" icon-type="delete"></bit-icon>-->
        <!--<bit-icon slot="card-actions" icon-type="edit"></bit-icon>-->
      <!--</smart-card>-->

      <!--<smart-card card-title="Logo"-->
                  <!--card-description="This is the WSP Logo."-->
                  <!--is-expanded-->
                  <!--watch-resize>-->
        <!--<template slot="card-content">-->
          <!--<img src="../src/styles/assets/wspLogo.svg" alt="test">-->
        <!--</template>-->
      <!--</smart-card>-->
      <!--<smart-card card-title="Devices"-->
                  <!--card-description="A list of all the devices."-->
                  <!--is-expanded-->
                  <!--style="grid-column: 1 / -1;">-->
        <!--<template slot="card-content">-->
          <!--<smart-table :table-data="getDevices"-->
                       <!--default-context="test">-->
          <!--</smart-table>-->
        <!--</template>-->
      <!--</smart-card>-->
    <!--</div>-->
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import ModelType from '../src/global/constants/ModelType';
import { createLinkToRecord, transformIntoFormModel } from '../src/global/mixins';

const { mapGetters, mapActions } = createNamespacedHelpers('people');

export default {
  name: 'demo',
  components: {
    BitBtn: () => import('../src/components/bit-btn'),
    BitIcon: () => import('../src/components/bit-icon'),
    BitLoading: () => import('../src/components/bit-loading'),
    BlockTableBody: () => import('../src/components/block-tableBody'),
    BlockActionContainer: () => import('../src/components/block-actionContainer'),
    BlockExpandableSection: () => import('../src/components/block-expandableSection'),
    BlockMessages: () => import('../src/components/block-messages'),
    SmartTabs: () => import('../src/components/smart-tabs'),
    SmartDetails: () => import('../src/components/smart-details'),
    SmartAccordion: () => import('../src/components/smart-accordion'),
    SmartSection: () => import('../src/components/smart-section'),
    SmartForm: () => import('../src/components/smart-form'),
    SmartTable: () => import('../src/components/smart-table'),
    SmartCard: () => import('../src/components/smart-card'),
    StackSearchableTable: () => import('../src/components/stack-searchableTable'),
    SmartLoading: () => import('../src/components/smart-loading'),
  },
  computed: {
    ...mapGetters(['getPeople']),
    propsToLink() {
      return {
        manufacturerName: createLinkToRecord({
          linkContext: 'Manufacturer',
          linkAction: 'Details',
          destinationLookupKey: 'name',
          destinationTable: this.getPeople,
          destinationIdKey: '_id',
        }),
      };
    },
    getDevices() {
      return this.devices;
    },
  },
  data() {
    return {
      devices: [],
      errors: [],
      messages: [
        'This is an error message',
        'You did the thing wrong',
        'That is not what we were expecting',
      ],
      formData: transformIntoFormModel({
        Name: {
          type: String,
          required: true,
        },
        Age: {
          type: Number,
          required: true,
        },
        HireDate: {
          value: [1, 2, 3],
          required: true,
        },
      }),
      searchModel: {
        Name: String,
        Age: Number,
        birthday: Date,
      },
      textModel: '',
      dateModel: new Date(),
      working: false,
      count: 0,
      james: {
        name: 'James',
        age: 25,
        isEmployee: true,
        birthday: new Date('09/11/1993'),
      },
      person: {
        name: String,
        address: String,
        age: Number,
        birthday: Date,
        isEmployee: Boolean,
        phoneNumber: ModelType.PhoneNumber,
      },
    };
  },
  methods: {
    ...mapActions(['addPerson']),
    async addNewPerson(submittedData) {
      await this.addPerson(submittedData);
    },
    async submit(submittedData) {
      // eslint-disable-next-line
      console.log(submittedData);
      this.working = true;
      await this.delay(1000);
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
    async populateDevices() {
      await this.delay(1000);

      this.devices = [
        {
          deviceId: 1,
          deviceModel: 'TEST',
          manufacturerName: 'James',
          registerDate: new Date().toUTCString(),
        },
        {
          deviceId: 2,
          deviceModel: 'ANOTHER',
          manufacturerName: 'James',
          registerDate: new Date().toUTCString(),
        },
        {
          deviceId: 3,
          deviceModel: 'More',
          manufacturerName: 'Smart Start',
          registerDate: new Date().toUTCString(),
        },
        {
          deviceId: 4,
          deviceModel: 'Device 1',
          manufacturerName: 'Draeger',
          registerDate: new Date().toUTCString(),
        },
        {
          deviceId: 5,
          deviceModel: 'Device 2',
          manufacturerName: 'Smart Start',
          registerDate: new Date().toUTCString(),
        },
        {
          deviceId: 6,
          deviceModel: 'Device 3',
          manufacturerName: 'Manufacturer 3',
          registerDate: new Date().toUTCString(),
        },
      ];
    },
    delay(time, value) {
      return new Promise((resolve) => {
        setTimeout(resolve.bind(null, value), time);
      });
    },
  },
  mounted() {
    this.populateDevices();
  },
};
</script>

<style scoped>
.demo-grid {
  width: 30%;
  margin: 10px auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  align-items: start;
  justify-content: center;
}
</style>
