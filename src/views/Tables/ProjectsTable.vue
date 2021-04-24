



<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <div
      class="card-header border-0"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white' : ''">
            {{ title }}
          </h3>
        </div>
        <div class="col text-right">
          <base-button type="primary" size="sm">See all</base-button>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table
        class="table align-items-center table-flush"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="tableData"
      >
        <template v-slot:columns>
          <!-- <th>Project</th>
          <th>Budget</th>
          <th>Status</th>
          <th>Users</th>
          <th>Completion</th> -->
          <th>Start Date</th>
          <th>End Date</th>
          <th>Absense Reason</th>

          <th></th>
        </template>

        <template v-slot:default="row">
          <!-- <th scope="row">
            <div class="media align-items-center">
              <div class="media-body">
                <span class="name mb-0 text-sm">{{ row.item.startDate }}</span>
              </div>
            </div>
          </th> -->
          <td class="budget">
            {{ row.item.startDate }}
          </td>
          <td class="budget">
            {{ row.item.endDate }}
          </td>
          <td class="budget">
            {{ row.item.absenseReason }}
          </td>

          <!-- <td>
            <badge class="badge-dot mr-4" :type="row.item.statusType">
              <i :class="`bg-${row.item.statusType}`"></i>
              <span class="status">{{ row.item.status }}</span>
            </badge>
          </td> -->
          <!-- <td>
            <div class="avatar-group">
              <a
                href="#"
                class="avatar avatar-sm rounded-circle"
                data-toggle="tooltip"
                data-original-title="Ryan Tompson"
              >
                <img
                  alt="Image placeholder"
                  src="img/theme/team-1-800x800.jpg"
                />
              </a>
              <a
                href="#"
                class="avatar avatar-sm rounded-circle"
                data-toggle="tooltip"
                data-original-title="Romina Hadid"
              >
                <img
                  alt="Image placeholder"
                  src="img/theme/team-2-800x800.jpg"
                />
              </a>
              <a
                href="#"
                class="avatar avatar-sm rounded-circle"
                data-toggle="tooltip"
                data-original-title="Alexander Smith"
              >
                <img
                  alt="Image placeholder"
                  src="img/theme/team-3-800x800.jpg"
                />
              </a>
              <a
                href="#"
                class="avatar avatar-sm rounded-circle"
                data-toggle="tooltip"
                data-original-title="Jessica Doe"
              >
                <img
                  alt="Image placeholder"
                  src="img/theme/team-4-800x800.jpg"
                />
              </a>
            </div>
          </td> -->

          <!-- <td>
            <div class="d-flex align-items-center">
              <span class="completion mr-2">{{ row.item.completion }}%</span>
              <div>
                <base-progress
                  :type="row.item.statusType"
                  :show-percentage="false"
                  class="pt-0"
                  :value="row.item.completion"
                />
              </div>
            </div>
          </td> -->

          <td class="text-right">
            <base-dropdown class="dropdown" position="right">
              <template v-slot:title>
                <a
                  class="btn btn-sm btn-icon-only text-light"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="fas fa-ellipsis-v"></i>
                </a>
              </template>

              <template>
                <a class="dropdown-item" href="#">Update</a>
                <a class="dropdown-item" href="#">Delete</a>
              </template>
            </base-dropdown>
          </td>
        </template>
      </base-table>
    </div>

    <div
      class="card-footer d-flex justify-content-end"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <base-pagination total="30"></base-pagination>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: "projects-table",
  props: {
    type: {
      type: String,
    },
    title: String,
  },
  data() {
    return {
      tableData: [
        
      ],
    };
  },
  async mounted() {
    let absenseData = await axios.get("https://se-backend-hlwhr.herokuapp.com/v1/absense");
    this.tableData = absenseData.data.data;
    console.log(this.tableData)
  }
};
</script>
<style></style>
