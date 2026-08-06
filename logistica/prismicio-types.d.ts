import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };


type PickContentRelationshipFieldData<
	TRelationship extends prismic.CustomTypeModelFetchCustomTypeLevel1 | prismic.CustomTypeModelFetchCustomTypeLevel2 | prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2,
	TData extends Record<string, prismic.AnyRegularField | prismic.GroupField | prismic.NestedGroupField | prismic.SliceZone>,
	TLang extends string
> = |
	// Content relationship fields
	{
		[TSubRelationship in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchContentRelationshipLevel1
		> as TSubRelationship["id"]]:
			ContentRelationshipFieldWithData<TSubRelationship["customtypes"], TLang>;
	} &
	// Group
	{
		[TGroup in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2
		> as TGroup["id"]]:
			TData[TGroup["id"]] extends prismic.GroupField<infer TGroupData>
				? prismic.GroupField<PickContentRelationshipFieldData<TGroup, TGroupData, TLang>>
				: never
	} &
	// Other fields
	{
		[TFieldKey in Extract<TRelationship["fields"][number], string>]:
			TFieldKey extends keyof TData ? TData[TFieldKey] : never;
	};

type ContentRelationshipFieldWithData<
	TCustomType extends readonly (prismic.CustomTypeModelFetchCustomTypeLevel1 | string)[] | readonly (prismic.CustomTypeModelFetchCustomTypeLevel2 | string)[],
	TLang extends string = string
> = {
	[ID in Exclude<TCustomType[number], string>["id"]]:
		prismic.ContentRelationshipField<
			ID,
			TLang,
			PickContentRelationshipFieldData<
				Extract<TCustomType[number], { id: ID }>,
				Extract<prismic.Content.AllDocumentTypes, { type: ID }>["data"],
				TLang
			>
		>
}[Exclude<TCustomType[number], string>["id"]];

type HomapageDocumentDataSlicesSlice = BeneficiosSlice | ServiciosSlice | CotizacionSlice | MapaSlice | ExperienciaSlice | InicioSlice

/**
 * Content for Homepage documents
 */
interface HomapageDocumentData {
	/**
	 * title field in *Homepage*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: homapage.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Slice Zone field in *Homepage*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: homapage.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<HomapageDocumentDataSlicesSlice>;/**
	 * Meta Title field in *Homepage*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: homapage.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Homepage*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: homapage.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Homepage*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: homapage.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * Homepage document from Prismic
 *
 * - **API ID**: `homapage`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HomapageDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<HomapageDocumentData>, "homapage", Lang>;

/**
 * Item in *Settings → Navigation*
 */
export interface SettingsDocumentDataNavItem {
	/**
	 * link field in *Settings → Navigation*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.nav[].link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * label field in *Settings → Navigation*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.nav[].label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
	
	/**
	 * special field in *Settings → Navigation*
	 *
	 * - **Field Type**: Boolean
	 * - **Placeholder**: *None*
	 * - **Default Value**: false
	 * - **API ID Path**: settings.nav[].special
	 * - **Documentation**: https://prismic.io/docs/fields/boolean
	 */
	special: prismic.BooleanField;
}

/**
 * Item in *Settings → telefono*
 */
export interface SettingsDocumentDataTelefonoItem {
	/**
	 * telefono field in *Settings → telefono*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.telefono[].telefono
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	telefono: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * nombre field in *Settings → telefono*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.telefono[].nombre
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	nombre: prismic.KeyTextField;
}

/**
 * Item in *Settings → redes*
 */
export interface SettingsDocumentDataRedesItem {
	/**
	 * red field in *Settings → redes*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.redes[].red
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	red: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * nombre field in *Settings → redes*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.redes[].nombre
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	nombre: prismic.KeyTextField;
}

/**
 * Item in *Settings → correo*
 */
export interface SettingsDocumentDataCorreoItem {
	/**
	 * nombre field in *Settings → correo*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.correo[].nombre
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	nombre: prismic.KeyTextField;
	
	/**
	 * correo field in *Settings → correo*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.correo[].correo
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	correo: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Item in *Settings → servicios_menu*
 */
export interface SettingsDocumentDataServiciosMenuItem {
	/**
	 * label field in *Settings → servicios_menu*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.servicios_menu[].label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
	
	/**
	 * description field in *Settings → servicios_menu*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.servicios_menu[].description
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	description: prismic.KeyTextField;
	
	/**
	 * link field in *Settings → servicios_menu*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.servicios_menu[].link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * icon field in *Settings → servicios_menu*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.servicios_menu[].icon
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	icon: prismic.KeyTextField;
}

/**
 * Content for Settings documents
 */
interface SettingsDocumentData {
	/**
	 * Meta_Description field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.meta_info
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_info: prismic.KeyTextField;
	
	/**
	 * Open_Graph_Image field in *Settings*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.og_image
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	og_image: prismic.ImageField<never>;
	
	/**
	 * Navigation field in *Settings*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.nav[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	nav: prismic.GroupField<Simplify<SettingsDocumentDataNavItem>>;
	
	/**
	 * data_title field in *Settings*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.data_title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	data_title: prismic.ImageField<never>;
	
	/**
	 * title field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * description field in *Settings*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.description
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * telefono field in *Settings*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.telefono[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	telefono: prismic.GroupField<Simplify<SettingsDocumentDataTelefonoItem>>;
	
	/**
	 * redes field in *Settings*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.redes[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	redes: prismic.GroupField<Simplify<SettingsDocumentDataRedesItem>>;
	
	/**
	 * correo field in *Settings*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.correo[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	correo: prismic.GroupField<Simplify<SettingsDocumentDataCorreoItem>>;
	
	/**
	 * derechos field in *Settings*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.derechos
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	derechos: prismic.RichTextField;
	
	/**
	 * servicios_menu field in *Settings*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.servicios_menu[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	servicios_menu: prismic.GroupField<Simplify<SettingsDocumentDataServiciosMenuItem>>;
}

/**
 * Settings document from Prismic
 *
 * - **API ID**: `settings`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SettingsDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<SettingsDocumentData>, "settings", Lang>;

export type AllDocumentTypes = HomapageDocument | SettingsDocument;

/**
 * Item in *Beneficios → Default → Primary → cards*
 */
export interface BeneficiosSliceDefaultPrimaryCardsItem {
	/**
	 * card_number field in *Beneficios → Default → Primary → cards*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: beneficios.default.primary.cards[].card_number
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	card_number: prismic.KeyTextField;
	
	/**
	 * card_tag field in *Beneficios → Default → Primary → cards*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: beneficios.default.primary.cards[].card_tag
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	card_tag: prismic.KeyTextField;
	
	/**
	 * card_title field in *Beneficios → Default → Primary → cards*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: beneficios.default.primary.cards[].card_title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	card_title: prismic.KeyTextField;
	
	/**
	 * card_image field in *Beneficios → Default → Primary → cards*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: beneficios.default.primary.cards[].card_image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	card_image: prismic.ImageField<never>;
	
	/**
	 * card_icon field in *Beneficios → Default → Primary → cards*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: beneficios.default.primary.cards[].card_icon
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	card_icon: prismic.KeyTextField;
	
	/**
	 * card_description field in *Beneficios → Default → Primary → cards*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: beneficios.default.primary.cards[].card_description
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	card_description: prismic.KeyTextField;
}

/**
 * Primary content in *Beneficios → Default → Primary*
 */
export interface BeneficiosSliceDefaultPrimary {
	/**
	 * badge_text field in *Beneficios → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: BENEFICIOS CLAVE
	 * - **API ID Path**: beneficios.default.primary.badge_text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	badge_text: prismic.KeyTextField;
	
	/**
	 * title field in *Beneficios → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: ¿POR QUÉ ELEGIRNOS?
	 * - **API ID Path**: beneficios.default.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * subtitle field in *Beneficios → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Ventajas concretas que marcan la diferencia...
	 * - **API ID Path**: beneficios.default.primary.subtitle
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	subtitle: prismic.KeyTextField;
	
	/**
	 * cards field in *Beneficios → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: beneficios.default.primary.cards[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	cards: prismic.GroupField<Simplify<BeneficiosSliceDefaultPrimaryCardsItem>>;
}

/**
 * Default variation for Beneficios Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type BeneficiosSliceDefault = prismic.SharedSliceVariation<"default", Simplify<BeneficiosSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Beneficios*
 */
type BeneficiosSliceVariation = BeneficiosSliceDefault

/**
 * Beneficios Shared Slice
 *
 * - **API ID**: `beneficios`
 * - **Description**: Beneficios
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type BeneficiosSlice = prismic.SharedSlice<"beneficios", BeneficiosSliceVariation>;

/**
 * Item in *Cotizacion → Default → Primary → contenido*
 */
export interface CotizacionSliceDefaultPrimaryContenidoItem {
	/**
	 * link field in *Cotizacion → Default → Primary → contenido*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: cotizacion.default.primary.contenido[].link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * activo field in *Cotizacion → Default → Primary → contenido*
	 *
	 * - **Field Type**: Boolean
	 * - **Placeholder**: *None*
	 * - **Default Value**: false
	 * - **API ID Path**: cotizacion.default.primary.contenido[].activo
	 * - **Documentation**: https://prismic.io/docs/fields/boolean
	 */
	activo: prismic.BooleanField;
	
	/**
	 * info field in *Cotizacion → Default → Primary → contenido*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: cotizacion.default.primary.contenido[].info
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	info: prismic.KeyTextField;
	
	/**
	 * titulo field in *Cotizacion → Default → Primary → contenido*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: cotizacion.default.primary.contenido[].titulo
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	titulo: prismic.KeyTextField;
}

/**
 * Item in *Cotizacion → Default → Primary → servicios*
 */
export interface CotizacionSliceDefaultPrimaryServiciosItem {
	/**
	 * servicio field in *Cotizacion → Default → Primary → servicios*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: cotizacion.default.primary.servicios[].servicio
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	servicio: prismic.KeyTextField;
}

/**
 * Primary content in *Cotizacion → Default → Primary*
 */
export interface CotizacionSliceDefaultPrimary {
	/**
	 * contactenos field in *Cotizacion → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: cotizacion.default.primary.contactenos
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	contactenos: prismic.RichTextField;
	
	/**
	 * horas field in *Cotizacion → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: cotizacion.default.primary.horas
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	horas: prismic.RichTextField;
	
	/**
	 * dias field in *Cotizacion → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: cotizacion.default.primary.dias
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	dias: prismic.RichTextField;
	
	/**
	 * cotizacion field in *Cotizacion → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: cotizacion.default.primary.cotizacion
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	cotizacion: prismic.RichTextField;
	
	/**
	 * servicio field in *Cotizacion → Default → Primary*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: Transporte de carga
	 * - **API ID Path**: cotizacion.default.primary.servicio
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	servicio: prismic.SelectField<"Transporte de carga" | "2da opción" | "3ra opción", "filled">;
	
	/**
	 * contenido field in *Cotizacion → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: cotizacion.default.primary.contenido[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	contenido: prismic.GroupField<Simplify<CotizacionSliceDefaultPrimaryContenidoItem>>;
	
	/**
	 * servicios field in *Cotizacion → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: cotizacion.default.primary.servicios[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	servicios: prismic.GroupField<Simplify<CotizacionSliceDefaultPrimaryServiciosItem>>;
	
	/**
	 * label_email field in *Cotizacion → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: cotizacion.default.primary.label_email
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label_email: prismic.KeyTextField;
	
	/**
	 * label_celular field in *Cotizacion → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: cotizacion.default.primary.label_celular
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label_celular: prismic.KeyTextField;
	
	/**
	 * label_documento field in *Cotizacion → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: cotizacion.default.primary.label_documento
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label_documento: prismic.KeyTextField;
	
	/**
	 * label_servicio field in *Cotizacion → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: cotizacion.default.primary.label_servicio
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label_servicio: prismic.KeyTextField;
	
	/**
	 * label_fecha field in *Cotizacion → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: cotizacion.default.primary.label_fecha
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label_fecha: prismic.KeyTextField;
	
	/**
	 * label_mensaje field in *Cotizacion → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: cotizacion.default.primary.label_mensaje
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label_mensaje: prismic.KeyTextField;
	
	/**
	 * texto_boton_enviar field in *Cotizacion → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: cotizacion.default.primary.texto_boton_enviar
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	texto_boton_enviar: prismic.KeyTextField;
}

/**
 * Default variation for Cotizacion Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type CotizacionSliceDefault = prismic.SharedSliceVariation<"default", Simplify<CotizacionSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Cotizacion*
 */
type CotizacionSliceVariation = CotizacionSliceDefault

/**
 * Cotizacion Shared Slice
 *
 * - **API ID**: `cotizacion`
 * - **Description**: Cotizacion
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type CotizacionSlice = prismic.SharedSlice<"cotizacion", CotizacionSliceVariation>;

/**
 * Item in *Experiencia → Default → Primary → images*
 */
export interface ExperienciaSliceDefaultPrimaryImagesItem {
	/**
	 * image field in *Experiencia → Default → Primary → images*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: experiencia.default.primary.images[].image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
}

/**
 * Primary content in *Experiencia → Default → Primary*
 */
export interface ExperienciaSliceDefaultPrimary {
	/**
	 * title field in *Experiencia → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: experiencia.default.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * images field in *Experiencia → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: experiencia.default.primary.images[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	images: prismic.GroupField<Simplify<ExperienciaSliceDefaultPrimaryImagesItem>>;
	
	/**
	 * badge_text field in *Experiencia → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: experiencia.default.primary.badge_text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	badge_text: prismic.KeyTextField;
}

/**
 * Default variation for Experiencia Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ExperienciaSliceDefault = prismic.SharedSliceVariation<"default", Simplify<ExperienciaSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Experiencia*
 */
type ExperienciaSliceVariation = ExperienciaSliceDefault

/**
 * Experiencia Shared Slice
 *
 * - **API ID**: `experiencia`
 * - **Description**: Experiencia
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ExperienciaSlice = prismic.SharedSlice<"experiencia", ExperienciaSliceVariation>;

/**
 * Item in *Inicio → Default → Primary → images*
 */
export interface InicioSliceDefaultPrimaryImagesItem {
	/**
	 * image field in *Inicio → Default → Primary → images*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: inicio.default.primary.images[].image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
	
	/**
	 * active field in *Inicio → Default → Primary → images*
	 *
	 * - **Field Type**: Boolean
	 * - **Placeholder**: *None*
	 * - **Default Value**: false
	 * - **API ID Path**: inicio.default.primary.images[].active
	 * - **Documentation**: https://prismic.io/docs/fields/boolean
	 */
	active: prismic.BooleanField;
}

/**
 * Primary content in *Inicio → Default → Primary*
 */
export interface InicioSliceDefaultPrimary {
	/**
	 * images field in *Inicio → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: inicio.default.primary.images[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	images: prismic.GroupField<Simplify<InicioSliceDefaultPrimaryImagesItem>>;
	
	/**
	 * subtitulo field in *Inicio → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: inicio.default.primary.subtitulo
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	subtitulo: prismic.KeyTextField;
	
	/**
	 * titulo field in *Inicio → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: inicio.default.primary.titulo
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	titulo: prismic.RichTextField;
	
	/**
	 * descripcion field in *Inicio → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: inicio.default.primary.descripcion
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	descripcion: prismic.RichTextField;
	
	/**
	 * texto_boton_primario field in *Inicio → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: inicio.default.primary.texto_boton_primario
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	texto_boton_primario: prismic.KeyTextField;
	
	/**
	 * enlace_boton_primario field in *Inicio → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: inicio.default.primary.enlace_boton_primario
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	enlace_boton_primario: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * texto_boton_secundario field in *Inicio → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: inicio.default.primary.texto_boton_secundario
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	texto_boton_secundario: prismic.KeyTextField;
	
	/**
	 * enlace_boton_secundario field in *Inicio → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: inicio.default.primary.enlace_boton_secundario
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	enlace_boton_secundario: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Default variation for Inicio Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type InicioSliceDefault = prismic.SharedSliceVariation<"default", Simplify<InicioSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Inicio*
 */
type InicioSliceVariation = InicioSliceDefault

/**
 * Inicio Shared Slice
 *
 * - **API ID**: `inicio`
 * - **Description**: Inicio
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type InicioSlice = prismic.SharedSlice<"inicio", InicioSliceVariation>;

/**
 * Primary content in *Mapa → Default → Primary*
 */
export interface MapaSliceDefaultPrimary {
	/**
	 * map field in *Mapa → Default → Primary*
	 *
	 * - **Field Type**: GeoPoint
	 * - **Placeholder**: *None*
	 * - **API ID Path**: mapa.default.primary.map
	 * - **Documentation**: https://prismic.io/docs/fields/geopoint
	 */
	map: prismic.GeoPointField;
	
	/**
	 * badge_text field in *Mapa → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: mapa.default.primary.badge_text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	badge_text: prismic.KeyTextField;
	
	/**
	 * title field in *Mapa → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: mapa.default.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
}

/**
 * Default variation for Mapa Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type MapaSliceDefault = prismic.SharedSliceVariation<"default", Simplify<MapaSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Mapa*
 */
type MapaSliceVariation = MapaSliceDefault

/**
 * Mapa Shared Slice
 *
 * - **API ID**: `mapa`
 * - **Description**: Mapa
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type MapaSlice = prismic.SharedSlice<"mapa", MapaSliceVariation>;

/**
 * Item in *Servicios → Default → Primary → servicios*
 */
export interface ServiciosSliceDefaultPrimaryServiciosItem {
	/**
	 * titulo field in *Servicios → Default → Primary → servicios*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: servicios.default.primary.servicios[].titulo
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	titulo: prismic.RichTextField;
	
	/**
	 * contenido field in *Servicios → Default → Primary → servicios*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: servicios.default.primary.servicios[].contenido
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	contenido: prismic.RichTextField;
}

/**
 * Primary content in *Servicios → Default → Primary*
 */
export interface ServiciosSliceDefaultPrimary {
	/**
	 * titulo_1 field in *Servicios → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: servicios.default.primary.titulo_1
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	titulo_1: prismic.RichTextField;
	
	/**
	 * titulo_2 field in *Servicios → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: servicios.default.primary.titulo_2
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	titulo_2: prismic.RichTextField;
	
	/**
	 * subtitulo field in *Servicios → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: servicios.default.primary.subtitulo
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	subtitulo: prismic.RichTextField;
	
	/**
	 * servicios field in *Servicios → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: servicios.default.primary.servicios[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	servicios: prismic.GroupField<Simplify<ServiciosSliceDefaultPrimaryServiciosItem>>;
	
	/**
	 * boton field in *Servicios → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: servicios.default.primary.boton
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	boton: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * contenido_boton field in *Servicios → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: servicios.default.primary.contenido_boton
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	contenido_boton: prismic.KeyTextField;
	
	/**
	 * imagen field in *Servicios → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: servicios.default.primary.imagen
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	imagen: prismic.ImageField<never>;
	
	/**
	 * texto_imagen field in *Servicios → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: servicios.default.primary.texto_imagen
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	texto_imagen: prismic.RichTextField;
	
	/**
	 * badge_text field in *Servicios → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: servicios.default.primary.badge_text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	badge_text: prismic.KeyTextField;
}

/**
 * Default variation for Servicios Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ServiciosSliceDefault = prismic.SharedSliceVariation<"default", Simplify<ServiciosSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Servicios*
 */
type ServiciosSliceVariation = ServiciosSliceDefault

/**
 * Servicios Shared Slice
 *
 * - **API ID**: `servicios`
 * - **Description**: Servicios
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ServiciosSlice = prismic.SharedSlice<"servicios", ServiciosSliceVariation>;

declare module "@prismicio/client" {
	interface CreateClient {
		(repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
	}
	
	interface CreateWriteClient {
		(repositoryNameOrEndpoint: string, options: prismic.WriteClientConfig): prismic.WriteClient<AllDocumentTypes>;
	}
	
	interface CreateMigration {
		(): prismic.Migration<AllDocumentTypes>;
	}
	
	namespace Content {
		export type {
			HomapageDocument,
			HomapageDocumentData,
			HomapageDocumentDataSlicesSlice,
			SettingsDocument,
			SettingsDocumentData,
			SettingsDocumentDataNavItem,
			SettingsDocumentDataTelefonoItem,
			SettingsDocumentDataRedesItem,
			SettingsDocumentDataCorreoItem,
			SettingsDocumentDataServiciosMenuItem,
			AllDocumentTypes,
			BeneficiosSlice,
			BeneficiosSliceDefaultPrimaryCardsItem,
			BeneficiosSliceDefaultPrimary,
			BeneficiosSliceVariation,
			BeneficiosSliceDefault,
			CotizacionSlice,
			CotizacionSliceDefaultPrimaryContenidoItem,
			CotizacionSliceDefaultPrimaryServiciosItem,
			CotizacionSliceDefaultPrimary,
			CotizacionSliceVariation,
			CotizacionSliceDefault,
			ExperienciaSlice,
			ExperienciaSliceDefaultPrimaryImagesItem,
			ExperienciaSliceDefaultPrimary,
			ExperienciaSliceVariation,
			ExperienciaSliceDefault,
			InicioSlice,
			InicioSliceDefaultPrimaryImagesItem,
			InicioSliceDefaultPrimary,
			InicioSliceVariation,
			InicioSliceDefault,
			MapaSlice,
			MapaSliceDefaultPrimary,
			MapaSliceVariation,
			MapaSliceDefault,
			ServiciosSlice,
			ServiciosSliceDefaultPrimaryServiciosItem,
			ServiciosSliceDefaultPrimary,
			ServiciosSliceVariation,
			ServiciosSliceDefault
		}
	}
}