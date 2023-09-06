<template>
  <div>
    <div>
      <h2 class="tw-text-8xl tw-text-center tw-p-10">ACP-Orientation</h2>
    </div>
    <div class="q-pa-md">
      <q-table title="Mentees" :rows="rows" :columns="columns" row-key="name" />
    </div>
  </div>
</template>

<script setup>
const columns = [
  {
    name: 'name',
    required: true,
    label: 'Employee ID',
    align: 'left',
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'Name',
    align: 'center',
    label: 'Name',
    field: 'Name',
    sortable: true,
  },
  { name: 'email', label: 'Email', field: 'email', sortable: true },
  { name: 'Cohort', label: 'Cohort', field: 'Cohort' },
  { name: 'Region', label: 'Region', field: 'Region' },
  { name: 'Milestone', label: 'Milestone', field: 'Milestone' },

];

const rows = [
  {
    name: '123456',
    Name: 'Mentee #1',
    email: 'mentee1@bcehs.ca',
    Cohort: '24-01',
    Region: 'Metro',
    Milestone: 2,
  },
  {
    name: '654321',
    Name: 'Mentee #2',
    email: 'mentee2@bcehs.ca',
    Cohort: '24-01',
    Region: 'Metro',
    Milestone: 2,
  },
];

const formatCell = (row, column) => {
  if (column.field) {
    const value = column.field(row);
    if (column.format) {
      return column.format(value);
    }
    return value;
  }
  return '';
};
</script>
