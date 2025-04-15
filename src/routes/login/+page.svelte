<script lang="ts">
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms';
	import { auth } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import toast from 'svelte-french-toast';
	import Cookies from 'universal-cookie';
	import { onMount } from 'svelte';
	import { zod } from 'sveltekit-superforms/adapters';
	import { loginSchema } from './schema';
	const cookies = new Cookies();
	export let data;

	// Check authentication status on component mount
	onMount(() => {
		const isAuth = cookies.get('is_auth');
		if (isAuth) {
			auth.login(); // Update auth store
			goto('/admin');
		}
	});

	const handle_form_submit = async (form: any) => {
		// Simple example - in real app you'd validate credentials
		if (form.data.email === 'admin@admin.com' && form.data.password === 'password') {
			auth.login();
			// Set authentication cookie using universal-cookie
			cookies.set('is_auth', true, {
				path: '/',
				maxAge: 86400, // 24 hours
				sameSite: 'strict'
			});
			toast.success('Login successful!');
			goto('/admin');
		} else {
			toast.error('Invalid credentials');
		}
	};

	const { form, errors, message, enhance } = superForm(data.form, {
		dataType: 'json',
		validationMethod: 'oninput',
		validators: zod(loginSchema),
		onUpdated: ({ form }) => {
			if (form.valid) {
				handle_form_submit(form);
			}
		},
		onError: () => {
			toast.error('Login failed');
		}
	});

</script>

<!-- {#if $message && $page.status === 200}
	<div class="w-full bg-green-50 text-green-600 p-2">
		{$message}
	</div>
{/if} -->

<div class="mt-20">
	<form method="POST" use:enhance class="max-w-[400px] mx-auto p-8 bg-white shadow-sm rounded-lg">
		<!-- Logo and company name -->
		<div class="flex flex-col items-center mb-8">
			<img src="/logo.png" alt="Admin Logo" class="h-16 mb-2" />
			<h1 class="text-2xl font-semibold text-gray-800">Svelte Admin</h1>
		</div>

		<label class="block mb-6">
			Email <span class="text-xs text-gray-500">admin@admin.com</span>
			<input 
				name="email" 
				type="email"
				class="w-full px-3 py-2 mt-2 bg-gray-50 rounded-md"
				aria-invalid={$errors.email ? 'true' : undefined} 
				bind:value={$form.email} 
			/>
			{#if $errors.email}
				<span class="text-red-600 text-sm mt-1">{$errors.email[0]}</span>
			{/if}
		</label>

		<label class="block mb-6">
			Password <span class="text-xs text-gray-500">password</span>
			<input 
				name="password" 
				type="password"
				class="w-full px-3 py-2 mt-2 bg-gray-50 rounded-md"
				aria-invalid={$errors.password ? 'true' : undefined} 
				bind:value={$form.password} 
			/>
			{#if $errors.password}
				<span class="text-red-600 text-sm mt-1">{$errors.password[0]}</span>
			{/if}
		</label>

		<button class="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium">
			Login
		</button>
	</form>
</div>