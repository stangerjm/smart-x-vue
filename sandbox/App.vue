<template>
  <div id="app">
    <layout-main>

      <template slot="header">

        <smart-nav :nav-items="nav"
                   nav-title="Admin"
                   usr="James"
                   :on-sign-out="signOut">
        </smart-nav>

      </template>

      <template slot="content">

        <!-- <demo></demo> -->

        <usability></usability>

      </template>

      <template slot="footer">

        <smart-footer></smart-footer>

      </template>

    </layout-main>

  </div>
</template>

<script>
import ModelType from '../src/global/constants/ModelType';
import { transformIntoFormModel } from '../src/global/mixins';

export default {
  name: 'app',
  components: {
    BitBtn: () => import('../src/components/bit-btn'),
    SmartNav: () => import('../src/components/smart-nav'),
    SmartFooter: () => import('../src/components/smart-footer'),
    SmartForm: () => import('../src/components/smart-form'),
    LayoutMain: () => import('../src/components/layout-main'),
    Demo: () => import('./demo'),
    Usability: () => import('./components/usability'),
  },
  data() {
    return {
      nav: [
        { linkTitle: 'Home', linkPath: '/' },
        { linkTitle: 'People', linkPath: '/person' },
        { linkTitle: 'Region', linkPath: '/region' },
        {
          linkTitle: 'Links',
          linkPath: '#',
          inlineItems: [
            { linkTitle: 'breathtest', linkPath: '#' },
            { linkTitle: 'wsp.wa.gov', linkPath: '#' },
            { linkTitle: 'Google', linkPath: '#' },
          ],
        },
        { linkTitle: 'Contact', linkPath: '#' },
      ],
      formModel: transformIntoFormModel({
        firstName: {
          type: String,
          required: true,
          span: '5',
        },
        middleInitial: {
          type: String,
          required: false,
          span: '2',
          displayName: 'M.I.',
        },
        lastName: {
          type: String,
          required: true,
          span: '5',
        },
        userName: {
          type: String,
          required: true,
          span: '6',
        },
        email: {
          type: String,
          required: true,
          span: '6',
        },
        dateOfBirth: {
          type: Date,
          required: true,
          span: '6',
        },
        phone: {
          type: ModelType.PhoneNumber,
          required: true,
          span: '6',
        },
        password: {
          type: ModelType.Password,
          required: true,
          span: '6',
        },
        confirmPassword: {
          type: ModelType.Password,
          required: true,
          span: '6',
        },
        choices: {
          type: ['test1', 'test2', 'test3'],
          required: true,
          span: 12,
        },
      }),
      // errorMessages: null,
      // formModel: {
      //   name: 'James',
      //   password: ModelType.Password('test'),
      //   age: 30,
      //   birthday: new Date('10/12/2010'),
      //   phone: ModelType.PhoneNumber('3604859925'),
      //   isEmployee: true,
      //   choices: ['test4', 'test5', 'test6']
      // },
      // formModel: {
      //   name: String,
      //   password: ModelType.Password,
      //   age: Number,
      //   birthday: Date,
      //   phone: ModelType.PhoneNumber,
      //   isEmployee: Boolean,
      //   choices: ['test7', 'test8', 'test9']
      // }
    };
  },
  computed: {
    getErrors() {
      return this.errorMessages;
    },
  },
  methods: {
    async submit(submittedData) {
      function delay(time, value) {
        return new Promise((resolve) => {
          setTimeout(resolve.bind(null, value), time);
        });
      }

      await delay(2000);

      console.log(submittedData);
      this.errorMessages = [
        { fieldName: 'firstName', message: 'Name must be correct' },
      ];
      // let stuff = Object.entries(submittedData);
      // stuff.forEach((data) => {
      //   console.table(data);
      // });
    },
    signOut() {
      this.$router.push('/test');
    },
  },
};
</script>

<style lang='scss'>
</style>
