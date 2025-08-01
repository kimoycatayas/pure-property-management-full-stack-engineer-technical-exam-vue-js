<template>
  <div class="page-wrapper">
    <div class="form-container">
      <div>
        <h2 class="form-title">{{ isEdit ? "Edit" : "Create" }} Agent</h2>
        <p class="form-subtitle">
          {{
            isEdit
              ? "Update the agent's information"
              : "Enter the agent's details below"
          }}
        </p>
      </div>
      <form @submit.prevent="handleSubmit" class="form">
        <div class="form-fields">
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input
              v-model="form.firstName"
              id="firstName"
              type="text"
              required
              placeholder="Enter first name"
            />
          </div>
          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input
              v-model="form.lastName"
              id="lastName"
              type="text"
              required
              placeholder="Enter last name"
            />
          </div>
          <div class="form-group">
            <label for="email">Email Address</label>
            <input
              v-model="form.email"
              id="email"
              type="email"
              required
              placeholder="name@example.com"
            />
          </div>
          <div class="form-group">
            <label for="mobileNumber">Mobile Number</label>
            <input
              v-model="form.mobileNumber"
              id="mobileNumber"
              type="text"
              required
              placeholder="Enter mobile number"
            />
          </div>
        </div>

        <div class="form-actions">
          <button type="submit">
            <span class="icon">
              <!-- Icon -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon-svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z"
                />
                <path
                  d="M16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"
                />
              </svg>
            </span>
            {{ isEdit ? "Update" : "Create" }} Agent
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f9fafb;
  padding: 3rem 1rem;
}

.form-container {
  width: 100%;
  max-width: 700px;
  background: #ffffff;
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.form-title {
  font-size: 1.875rem;
  font-weight: 800;
  color: #1f2937;
  text-align: center;
  margin-bottom: 0.5rem;
}

.form-subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
  margin-bottom: 1rem;
}

.form {
  margin-top: 1.5rem;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
}

.form-group input {
  padding: 0.625rem 0.75rem;
  font-size: 0.875rem;
  color: #111827;
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-group input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
}

.form-actions {
  margin-top: 2rem;
}

.form-actions button {
  width: 100%;
  background-color: #4f46e5;
  color: #ffffff;
  font-weight: 600;
  font-size: 0.875rem;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.form-actions button:hover {
  background-color: #4338ca;
  transform: scale(1.02);
}

.icon-svg {
  width: 1.25rem;
  height: 1.25rem;
  color: #e0e7ff;
}
</style>

<script setup lang="ts">
import { reactive, computed, watch } from "vue";
import axios from "../axios";
import { defineProps, defineEmits } from "vue";

type Agent = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
};

const props = defineProps<{ agent?: Agent }>();
const emit = defineEmits<{
  (e: "saved", agent: Agent): void;
}>();

const form = reactive<Agent>({
  firstName: "",
  lastName: "",
  email: "",
  mobileNumber: "",
});

const isEdit = computed(() => !!props.agent);

// Populate form when editing
watch(
  () => props.agent,
  (val) => {
    if (val) {
      form.id = val.id;
      form.firstName = val.firstName;
      form.lastName = val.lastName;
      form.email = val.email;
      form.mobileNumber = val.mobileNumber;
    }
  },
  { immediate: true }
);

async function handleSubmit() {
  try {
    if (isEdit.value && form.id) {
      // Update existing agent
      const res = await axios.put(`/agents/${form.id}`, form);
      emit("saved", res.data);
    } else {
      // Create new agent
      const res = await axios.post("/agents", form);
      emit("saved", res.data);
    }
    // Reset form if creating
    if (!isEdit.value) {
      form.firstName = "";
      form.lastName = "";
      form.email = "";
      form.mobileNumber = "";
    }
  } catch (err: any) {
    console.error("Error saving agent:", err);
    alert(err.response?.data?.message || "Failed to save agent");
  }
}
</script>

<style scoped>
/* Optional: additional styling */
</style>
