<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">Page visits</h3>
        </div>
        <div class="col text-right">
          <a href="#!" class="btn btn-sm btn-primary">See all</a>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table thead-classes="thead-light" :data="schedules">
        <template v-slot:columns>
          <th>Hours</th>
          <th>Registration Type</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Progress</th>
        </template>

        <template v-slot:default="row">
          <th scope="row">
            {{ row.item.hoursTotal }}
          </th>
          <td>
            {{ row.item.regType }}
          </td>
          <td>
            {{ new Date(row.item.startDate).toString().slice(0,24) }}
          </td>
          <td>
            {{ new Date(row.item.endDate).toString().slice(0,24) }}
          </td>
          <td>
            <i
              class="fas fa-arrow-up text-success mr-3"
              :class="
                row.item.updown === 'up'
                  ? 'text-success'
                  : 'text-danger'
              "
            >
            </i>
            {{ row.item.bounceRate }}
          </td>
        </template>
      </base-table>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "page-visits-table",
  data() {
    return {
      schedules:[],
      updown:[],
    };
  },

  async mounted() {
    let response = await axios.get("https://se-backend-hlwhr.herokuapp.com/v1/schedules");
    this.schedules = response.data.data;
    console.log("SCHEDULES");
    console.log(this.schedules.length);
    console.log(this.schedules[2]);
    console.log(this.schedules[3]);
    console.log(this.schedules[4].hoursTotal); 

    for (let i = 0; i < this.schedules.length-1; i++) {
      console.log(this.schedules[i].hoursTotal)
    }

    for (let i = 0; i < this.schedules.length-1; i++) {
    // for (let i = 0; i < 5; i++) {
      // console.log()
      // this.schedules[i].updown = "HELLOO";
      if (this.schedules[i].hoursTotal <= this.schedules[i+1].hoursTotal ) {
         console.log(this.schedules[i].hoursTotal ,"<=", this.schedules[i+1].hoursTotal,this.schedules[i].hoursTotal <= this.schedules[i+1].hoursTotal)
         this.schedules[i+1].updown = "up"
      } else {
         this.schedules[i+1].updown = "down"
      }

    console.log("this.schedules[i].updown",this.schedules[i].updown)
    }

  }

};
</script>
<style></style>
