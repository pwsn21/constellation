<template>
    <div>
        <div>
            <!-- Use the ChildComponent and bind the 'text' prop and 'update:text' event -->
            <DateTimePicker :date="meetingTwo" @update:date="updateTwo" />

            <!-- Display the value from the child component -->
            <p>Value from Child Component: {{ meetingTwo }}</p>
        </div>
        <div>
            <!-- Use the ChildComponent and bind the 'text' prop and 'update:text' event -->
            <DateTimePicker :date="meetingThree" @update:date="updateThree" />

            <!-- Display the value from the child component -->
            <p>Value from Child Component: {{ meetingThree }}</p>
        </div>
    </div>
</template>
  
<script setup>
const meetingTwo = ref(''); // Initialize the meetingTwo ref
const meetingThree = ref(''); // Initialize the meetingTwo ref

// Define a function to handle updates from the child component
const updateTwo = (newValue) => {
    meetingTwo.value = newValue; // Update the parent's ref with the new value
};
const updateThree = (newValue) => {
    meetingThree.value = newValue; // Update the parent's ref with the new value
};
</script>
  