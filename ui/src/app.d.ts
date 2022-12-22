// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

// and what to do when importing types
declare namespace App {
	// interface Error {}
	interface Locals {
		user: {
			/**
			 * The user's id
			 */
			id: string;
			/**
			 * The user's username, not unique across the platform
			 */
			username: string;
			/**
			 * The user's 4-digit discord-tag
			 */
			discriminator: string;
			/**
			 * The user's avatar hash
			 *
			 * See https://discord.com/developers/docs/reference#image-formatting
			 */
			avatar: string | null;
			/**
			 * Whether the user belongs to an OAuth2 application
			 */
			bot?: boolean;
			/**
			 * Whether the user is an Official Discord System user (part of the urgent message system)
			 */
			system?: boolean;
			/**
			 * Whether the user has two factor enabled on their account
			 */
			mfa_enabled?: boolean;
			/**
			 * The user's banner hash
			 *
			 * See https://discord.com/developers/docs/reference#image-formatting
			 */
			banner?: string | null;
			/**
			 * The user's banner color encoded as an integer representation of hexadecimal color code
			 */
			accent_color?: number | null;
			/**
			 * The user's chosen language option
			 */
			locale?: string;
			/**
			 * Whether the email on this account has been verified
			 */
			verified?: boolean;
			/**
			 * The user's email
			 */
			email?: string | null;
		} | null;
	}
	// interface PageData {}
	// interface Platform {}
}
