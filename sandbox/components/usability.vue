<template>
    <div class="usability">
      <h2>Active Technicians</h2>

      <stack-searchable-table :table-data="technicians"
                            include-action-container
                            default-context="test"
                            :searchModel="searchModel"
                            :results-per-page="100">

        <template slot="table-action" slot-scope="{ getActionPath, itemId }">
          <router-link :to="getActionPath('test', 'details', itemId)">Details</router-link>
        </template>

      </stack-searchable-table>
    </div>
</template>
<script>
export default {
  name: 'usability',
  components: {
    StackSearchableTable: () => import('../../src/components/stack-searchableTable'),
  },
  data() {
    const manufacturers = ['Acme, Inc.', 'Widgets R. Us', 'Test Manufacturer'];
    return {
      searchModel: {
        'Full Name': {
          firstName: String,
          lastName: String,
        },
        manufacturer: manufacturers,
        'Name and Manufacturer': {
          firstName: String,
          manufacturer: manufacturers,
        },
        NameAndDOB: {
          firstName: String,
          dateOfBirth: Date,
        },
      },
      technicians: [
        { userName: 'JoshTest', firstName: 'Josh', lastName: 'Napier', email: 'josh.napier@wsp.wa.gov2', applicationStatus: 'Sponsorship Denied', dateOfBirth: new Date('01/02/2019'), manufacturer: 'Test Manufacturer' },
        { userName: 'stangerjm', firstName: 'Test', lastName: 'Person', email: 'testperson@person.com', applicationStatus: 'Test Passed', dateOfBirth: new Date('02/06/2019'), manufacturer: 'Widgets R. Us' },
        { userName: 'newtechnician', firstName: 'Tech', lastName: 'Lastname', email: ' tech.lastname@wsp.wa.gov', applicationStatus: 'Sponsorship Denied', dateOfBirth: new Date('05/06/2000'), manufacturer: 'Widgets R. Us' },
        { userName: 'TestUser2', firstName: 'User2', lastName: 'Test2', email: 'test2@testuser.com', applicationStatus: 'Pending Sponsorship', dateOfBirth: new Date('01/01/2001'), manufacturer: 'Acme, Inc.' },
        { userName: 'lastTech', firstName: 'Last', lastName: 'Tech', email: 'last@tech.com ', applicationStatus: 'Test Failed', dateOfBirth: new Date('02/20/1994'), manufacturer: 'Widgets R. Us' },
        { userName: 'imsTest', firstName: 'Jonathan', lastName: 'Doe', email: ' johndoe@example.com', applicationStatus: 'Test Passed', dateOfBirth: new Date('02/22/1978'), manufacturer: 'Acme, Inc.' },
        { userName: 'TestUser3', firstName: 'User3', lastName: 'Test3', email: 'test3@testuser.com', applicationStatus: 'Pending Sponsorship', dateOfBirth: new Date('01/01/2002'), manufacturer: 'Test Manufacturer' },
        { userName: 'techniciantest', firstName: 'Technician', lastName: 'Test', email: ' technicianTest@wsp.wa.gov', applicationStatus: 'Test Passed', dateOfBirth: new Date('02/12/1945'), manufacturer: 'Widgets R. Us' },
        { userName: 'kcampos02', firstName: 'Kelli', lastName: 'Campos', email: 'asdf@wsp.wa.gov', applicationStatus: 'Test Passed', dateOfBirth: new Date('12/08/1990'), manufacturer: 'Acme, Inc.' },
        { userName: 'TestUser4', firstName: 'User4', lastName: 'Test4', email: 'test4@testuser.com', applicationStatus: 'Pending Sponsorship', dateOfBirth: new Date('01/01/2003'), manufacturer: 'Widgets R. Us' },
        { userName: 'janedoe', firstName: 'Jane', lastName: 'Doe', email: 'janedoe@gmail.com', applicationStatus: 'Test Passed', dateOfBirth: new Date('01/01/2001'), manufacturer: 'Acme, Inc.' },
        { userName: 'jhag225', firstName: 'Jeremy', lastName: 'Hagquist', email: 'jeremy.hagquist@wsp.wa.gov', applicationStatus: 'Test Passed', dateOfBirth: new Date('02/26/1989'), manufacturer: 'Test Manufacturer' },
        { userName: 'TestUser5', firstName: 'User5', lastName: 'Test5', email: 'test5@testuser.com', applicationStatus: 'Pending Sponsorship', dateOfBirth: new Date('01/01/2004'), manufacturer: 'Widgets R. Us' },
        { userName: 'jnap225', firstName: 'Josh', lastName: 'Napier', email: 'josh.napier@wsp.wa.gov', applicationStatus: 'Test Failed', dateOfBirth: new Date('03/04/1960'), manufacturer: 'Test Manufacturer' },
        { userName: 'TestUser6', firstName: 'User6', lastName: 'Test6', email: 'test6@testuser.com', applicationStatus: 'Pending Sponsorship', dateOfBirth: new Date('01/01/2005'), manufacturer: 'Test Manufacturer' },
        { userName: 'smithjohn', firstName: 'John', lastName: 'Smith', email: 'smithjohn@test.com', applicationStatus: 'Test Failed', dateOfBirth: new Date('01/01/1985'), manufacturer: 'Acme, Inc.' },
        { userName: 'TestUser7', firstName: 'User7', lastName: 'Test7', email: 'test7@testuser.com', applicationStatus: 'Pending Sponsorship', dateOfBirth: new Date('01/01/2006'), manufacturer: 'Acme, Inc.' },
        { userName: 'test', firstName: 'Test', lastName: 'RoleId', email: 'test.roleid@test.com', applicationStatus: 'Test Failed', dateOfBirth: new Date('03/04/1998'), manufacturer: 'Test Manufacturer' },
        { userName: 'TestUser12', firstName: 'User12', lastName: 'Test12', email: 'test12@testuser.com', applicationStatus: 'Pending Sponsorship', dateOfBirth: new Date('01/01/2001'), manufacturer: 'Widgets R. Us' },
        { userName: 'TestUser8', firstName: 'User8', lastName: 'Test8', email: 'test8@testuser.com', applicationStatus: 'Pending Sponsorship', dateOfBirth: new Date('01/01/2007'), manufacturer: 'Widgets R. Us' },
      ],
    };
  },
};
</script>
<style>
  .usability {
    width: 75%;
    margin: 0 auto;
  }
</style>
