<template>
    <div class="usability">
      <h2>Active Technicians</h2>

      <stack-searchable-table :table-data="getPeople"
                              include-action-container
                              default-context="test"
                              :searchModel="searchModel"
                              default-filter="Full Name"
                              :results-per-page="100"
                              :on-search="log"
                              :on-reset="log">

        <template slot="table-action" slot-scope="{ getActionPath, itemId }">
          <router-link :to="getActionPath('test', 'details', itemId)">Details</router-link>
        </template>

      </stack-searchable-table>
    </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
import ModelType from '../../src/global/constants/ModelType';


const { mapActions, mapGetters } = createNamespacedHelpers('people');

export default {
  name: 'usability',
  components: {
    StackSearchableTable: () => import('../../src/components/stack-searchableTable'),
  },
  methods: {
    ...mapActions(['fetchPeopleData']),
    log(x) {
      console.log(x);
    },
  },
  computed: {
    ...mapGetters(['getPeople']),
  },
  data() {
    const manufacturers = ['Acme, Inc.', 'Widgets R. Us', 'Test Manufacturer'];
    return {
      searchModel: {
        'Full Name': {
          firstName: 'Josh',
          lastName: String,
        },
        Manufacturer: {
          manufacturer: manufacturers,
        },
        'Name and Manufacturer': {
          firstName: String,
          manufacturer: manufacturers,
        },
        'Name And DOB': {
          firstName: String,
          dateOfBirth: Date,
        },
        phoneNumber: ModelType.PhoneNumber(),
      },
      technicians: [
        {
          userName: 'JoshTest',
          firstName: 'Josh',
          lastName: 'Napier',
          email: 'josh.napier@wsp.wa.gov2',
          applicationStatus: 'Sponsorship Denied',
          dateOfBirth: new Date('01/02/2019'),
          manufacturer: 'Test Manufacturer',
          phoneNumber: '(360) 123-4567',
        },
        {
          userName: 'stangerjm',
          firstName: 'Test',
          lastName: 'Person',
          email: 'testperson@person.com',
          applicationStatus: 'Test Passed',
          dateOfBirth: new Date('02/06/2019'),
          manufacturer: 'Widgets R. Us',
          phoneNumber: '(360) 123-4567',
        },
        {
          userName: 'newtechnician',
          firstName: 'Tech',
          lastName: 'Lastname',
          email: ' tech.lastname@wsp.wa.gov',
          applicationStatus: 'Sponsorship Denied',
          dateOfBirth: new Date('05/06/2000'),
          manufacturer: 'Widgets R. Us',
          phoneNumber: '(360) 123-4567',
        },
        {
          userName: 'TestUser2',
          firstName: 'User2',
          lastName: 'Test2',
          email: 'test2@testuser.com',
          applicationStatus: 'Pending Sponsorship',
          dateOfBirth: new Date('01/01/2001'),
          manufacturer: 'Acme, Inc.',
          phoneNumber: '(360) 123-4567',
        },
        {
          userName: 'lastTech',
          firstName: 'Last',
          lastName: 'Tech',
          email: 'last@tech.com ',
          applicationStatus: 'Test Failed',
          dateOfBirth: new Date('02/20/1994'),
          manufacturer: 'Widgets R. Us',
          phoneNumber: '(360) 123-4567',
        },
        {
          userName: 'imsTest',
          firstName: 'Jonathan',
          lastName: 'Doe',
          email: ' johndoe@example.com',
          applicationStatus: 'Test Passed',
          dateOfBirth: new Date('02/22/1978'),
          manufacturer: 'Acme, Inc.',
          phoneNumber: '(360) 123-4567',
        },
        {
          userName: 'TestUser3',
          firstName: 'User3',
          lastName: 'Test3',
          email: 'test3@testuser.com',
          applicationStatus: 'Pending Sponsorship',
          dateOfBirth: new Date('01/01/2002'),
          manufacturer: 'Test Manufacturer',
          phoneNumber: '(360) 123-4567',
        },
        {
          userName: 'techniciantest',
          firstName: 'Technician',
          lastName: 'Test',
          email: ' technicianTest@wsp.wa.gov',
          applicationStatus: 'Test Passed',
          dateOfBirth: new Date('02/12/1945'),
          manufacturer: 'Widgets R. Us',
          phoneNumber: '(360) 123-4567',
        },
        {
          userName: 'kcampos02',
          firstName: 'Kelli',
          lastName: 'Campos',
          email: 'asdf@wsp.wa.gov',
          applicationStatus: 'Test Passed',
          dateOfBirth: new Date('12/08/1990'),
          manufacturer: 'Acme, Inc.',
          phoneNumber: '(360) 123-4567',
        },
        {
          userName: 'TestUser4',
          firstName: 'User4',
          lastName: 'Test4',
          email: 'test4@testuser.com',
          applicationStatus: 'Pending Sponsorship',
          dateOfBirth: new Date('01/01/2003'),
          manufacturer: 'Widgets R. Us',
          phoneNumber: '(360) 123-4567',
        },
        {
          userName: 'janedoe',
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'janedoe@gmail.com',
          applicationStatus: 'Test Passed',
          dateOfBirth: new Date('01/01/2001'),
          manufacturer: 'Acme, Inc.',
          phoneNumber: '(360) 123-4567',
        },
        {
          userName: 'jhag225',
          firstName: 'Jeremy',
          lastName: 'Hagquist',
          email: 'jeremy.hagquist@wsp.wa.gov',
          applicationStatus: 'Test Passed',
          dateOfBirth: new Date('02/26/1989'),
          manufacturer: 'Test Manufacturer',
          phoneNumber: '(360) 123-4567',
        },
        {
          userName: 'TestUser5',
          firstName: 'User5',
          lastName: 'Test5',
          email: 'test5@testuser.com',
          applicationStatus: 'Pending Sponsorship',
          dateOfBirth: new Date('01/01/2004'),
          manufacturer: 'Widgets R. Us',
          phoneNumber: '(360) 123-4567',
        },
        {
          userName: 'jnap225',
          firstName: 'Josh',
          lastName: 'Napier',
          email: 'josh.napier@wsp.wa.gov',
          applicationStatus: 'Test Failed',
          dateOfBirth: new Date('03/04/1960'),
          manufacturer: 'Test Manufacturer',
          phoneNumber: '(360) 123-4567',
        },
        {
          userName: 'TestUser6',
          firstName: 'User6',
          lastName: 'Test6',
          email: 'test6@testuser.com',
          applicationStatus: 'Pending Sponsorship',
          dateOfBirth: new Date('01/01/2005'),
          manufacturer: 'Test Manufacturer',
          phoneNumber: '(360) 123-4567',
        },
        {
          userName: 'smithjohn',
          firstName: 'John',
          lastName: 'Smith',
          email: 'smithjohn@test.com',
          applicationStatus: 'Test Failed',
          dateOfBirth: new Date('01/01/1985'),
          manufacturer: 'Acme, Inc.',
          phoneNumber: '(360) 123-4567',
        },
        {
          userName: 'TestUser7',
          firstName: 'User7',
          lastName: 'Test7',
          email: 'test7@testuser.com',
          applicationStatus: 'Pending Sponsorship',
          dateOfBirth: new Date('01/01/2006'),
          manufacturer: 'Acme, Inc.',
          phoneNumber: '(360) 123-4567',
        },
        {
          userName: 'test',
          firstName: 'Test',
          lastName: 'RoleId',
          email: 'test.roleid@test.com',
          applicationStatus: 'Test Failed',
          dateOfBirth: new Date('03/04/1998'),
          manufacturer: 'Test Manufacturer',
          phoneNumber: '(360) 123-4567',
        },
        {
          userName: 'TestUser12',
          firstName: 'User12',
          lastName: 'Test12',
          email: 'test12@testuser.com',
          applicationStatus: 'Pending Sponsorship',
          dateOfBirth: new Date('01/01/2001'),
          manufacturer: 'Widgets R. Us',
          phoneNumber: '(360) 123-4567',
        },
        {
          userName: 'TestUser8',
          firstName: 'User8',
          lastName: 'Test8',
          email: 'test8@testuser.com',
          applicationStatus: 'Pending Sponsorship',
          dateOfBirth: new Date('01/01/2007'),
          manufacturer: 'Widgets R. Us',
          phoneNumber: '(360) 123-4567',
        },
      ],
    };
  },
  created() {
    this.fetchPeopleData();
  },
};
</script>
<style>
  .usability {
    width: 75%;
    margin: 0 auto;
  }
</style>
