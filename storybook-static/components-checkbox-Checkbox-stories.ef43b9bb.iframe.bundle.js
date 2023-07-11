"use strict";(self.webpackChunkpaxer_ecomm=self.webpackChunkpaxer_ecomm||[]).push([[511],{"./src/components/checkbox/Checkbox.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,Disabled:()=>Disabled,SelectedAndDisbled:()=>SelectedAndDisbled,SelectedByDefault:()=>SelectedByDefault,WithSubtitle:()=>WithSubtitle,default:()=>Checkbox_stories});var _templateObject,_templateObject2,_templateObject3,_templateObject4,_Default$parameters,_Default$parameters2,_Default$parameters2$,_WithSubtitle$paramet,_WithSubtitle$paramet2,_WithSubtitle$paramet3,_SelectedByDefault$pa,_SelectedByDefault$pa2,_SelectedByDefault$pa3,_Disabled$parameters,_Disabled$parameters2,_Disabled$parameters3,_SelectedAndDisbled$p,_SelectedAndDisbled$p2,_SelectedAndDisbled$p3,defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),taggedTemplateLiteral=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js"),react=__webpack_require__("./node_modules/react/index.js"),esm=__webpack_require__("./node_modules/flowbite-react/lib/esm/index.js"),tailwind_styled_components_esm=__webpack_require__("./node_modules/tailwind-styled-components/dist/tailwind-styled-components.esm.js"),utils=__webpack_require__("./src/lib/utils.ts"),__jsx=react.createElement,Content=tailwind_styled_components_esm.Z.div(_templateObject||(_templateObject=(0,taggedTemplateLiteral.Z)(["\n  flex items-center\n"]))),LabelContainer=tailwind_styled_components_esm.Z.div(_templateObject2||(_templateObject2=(0,taggedTemplateLiteral.Z)(["\n  flex flex-1 flex-col items-start justify-center gap-[2px] px-0 pb-0 pt-px ml-4 \n"]))),Label=tailwind_styled_components_esm.Z.span(_templateObject3||(_templateObject3=(0,taggedTemplateLiteral.Z)(["\n  text-sm leading-[160%] font-semibold text-gray-900\n"]))),Subtitle=tailwind_styled_components_esm.Z.span(_templateObject4||(_templateObject4=(0,taggedTemplateLiteral.Z)(["\n  text-xs leading-[160%] text-gray-500\n"])));function CheckboxComponent(_ref){var id=_ref.id,className=_ref.className,label=_ref.label,name=_ref.name,value=_ref.value,subtitle=_ref.subtitle,_ref$checked=_ref.checked,checked=void 0!==_ref$checked&&_ref$checked,_ref$disabled=_ref.disabled,disabled=void 0!==_ref$disabled&&_ref$disabled;return __jsx(Content,null,__jsx(esm.XZ,{className:(0,utils.cn)(" \nh-4 w-4 rounded border border-gray-300 bg-white focus:ring-0 focus:ring-green text-green\n",className),id,name,value,disabled,checked:!!checked||void 0,"data-testid":"test-element"}),__jsx(LabelContainer,null,!!label&&__jsx(Label,null,label),!!subtitle&&__jsx(Subtitle,null,subtitle)))}CheckboxComponent.displayName="CheckboxComponent",CheckboxComponent.__docgenInfo={description:"",methods:[],displayName:"CheckboxComponent",props:{checked:{defaultValue:{value:"false",computed:!1},required:!1,tsType:{name:"boolean"},description:""},disabled:{defaultValue:{value:"false",computed:!1},required:!1,tsType:{name:"boolean"},description:""},id:{required:!1,tsType:{name:"string"},description:""},className:{required:!1,tsType:{name:"string"},description:""},label:{required:!1,tsType:{name:"string"},description:""},name:{required:!1,tsType:{name:"string"},description:""},value:{required:!1,tsType:{name:"string"},description:""},subtitle:{required:!1,tsType:{name:"string"},description:""}}};try{Checkbox.displayName="Checkbox",Checkbox.__docgenInfo={description:"",displayName:"Checkbox",props:{id:{defaultValue:null,description:"",name:"id",required:!1,type:{name:"string"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},label:{defaultValue:null,description:"",name:"label",required:!1,type:{name:"string"}},name:{defaultValue:null,description:"",name:"name",required:!1,type:{name:"string"}},value:{defaultValue:null,description:"",name:"value",required:!1,type:{name:"string"}},subtitle:{defaultValue:null,description:"",name:"subtitle",required:!1,type:{name:"string"}},checked:{defaultValue:{value:"false"},description:"",name:"checked",required:!1,type:{name:"boolean"}},disabled:{defaultValue:{value:"false"},description:"",name:"disabled",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/checkbox/Checkbox.tsx#Checkbox"]={docgenInfo:Checkbox.__docgenInfo,name:"Checkbox",path:"src/components/checkbox/Checkbox.tsx#Checkbox"})}catch(__react_docgen_typescript_loader_error){}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){(0,defineProperty.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}const Checkbox_stories={title:"Components/Checkbox",component:CheckboxComponent,tags:["autodocs"],argTypes:{}};var Default={args:{className:"",label:"Label"}},WithSubtitle={args:_objectSpread(_objectSpread({},Default.args),{},{subtitle:"Subtitle"})},SelectedByDefault={args:_objectSpread(_objectSpread({},Default.args),{},{checked:!0})},Disabled={args:_objectSpread(_objectSpread({},Default.args),{},{checked:!1,disabled:!0})},SelectedAndDisbled={args:_objectSpread(_objectSpread({},Default.args),{},{checked:!0,disabled:!0})};Default.parameters=_objectSpread(_objectSpread({},Default.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Default$parameters=Default.parameters)||void 0===_Default$parameters?void 0:_Default$parameters.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    className: '',\n    label: 'Label'\n  }\n}"},null===(_Default$parameters2=Default.parameters)||void 0===_Default$parameters2||null===(_Default$parameters2$=_Default$parameters2.docs)||void 0===_Default$parameters2$?void 0:_Default$parameters2$.source)})}),WithSubtitle.parameters=_objectSpread(_objectSpread({},WithSubtitle.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_WithSubtitle$paramet=WithSubtitle.parameters)||void 0===_WithSubtitle$paramet?void 0:_WithSubtitle$paramet.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    ...Default.args,\n    subtitle: 'Subtitle'\n  }\n}"},null===(_WithSubtitle$paramet2=WithSubtitle.parameters)||void 0===_WithSubtitle$paramet2||null===(_WithSubtitle$paramet3=_WithSubtitle$paramet2.docs)||void 0===_WithSubtitle$paramet3?void 0:_WithSubtitle$paramet3.source)})}),SelectedByDefault.parameters=_objectSpread(_objectSpread({},SelectedByDefault.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_SelectedByDefault$pa=SelectedByDefault.parameters)||void 0===_SelectedByDefault$pa?void 0:_SelectedByDefault$pa.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    ...Default.args,\n    checked: true\n  }\n}"},null===(_SelectedByDefault$pa2=SelectedByDefault.parameters)||void 0===_SelectedByDefault$pa2||null===(_SelectedByDefault$pa3=_SelectedByDefault$pa2.docs)||void 0===_SelectedByDefault$pa3?void 0:_SelectedByDefault$pa3.source)})}),Disabled.parameters=_objectSpread(_objectSpread({},Disabled.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Disabled$parameters=Disabled.parameters)||void 0===_Disabled$parameters?void 0:_Disabled$parameters.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    ...Default.args,\n    checked: false,\n    disabled: true\n  }\n}"},null===(_Disabled$parameters2=Disabled.parameters)||void 0===_Disabled$parameters2||null===(_Disabled$parameters3=_Disabled$parameters2.docs)||void 0===_Disabled$parameters3?void 0:_Disabled$parameters3.source)})}),SelectedAndDisbled.parameters=_objectSpread(_objectSpread({},SelectedAndDisbled.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_SelectedAndDisbled$p=SelectedAndDisbled.parameters)||void 0===_SelectedAndDisbled$p?void 0:_SelectedAndDisbled$p.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    ...Default.args,\n    checked: true,\n    disabled: true\n  }\n}"},null===(_SelectedAndDisbled$p2=SelectedAndDisbled.parameters)||void 0===_SelectedAndDisbled$p2||null===(_SelectedAndDisbled$p3=_SelectedAndDisbled$p2.docs)||void 0===_SelectedAndDisbled$p3?void 0:_SelectedAndDisbled$p3.source)})})},"./src/lib/utils.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{cn:()=>cn});var clsx__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/clsx/dist/clsx.m.js"),tailwind_merge__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/tailwind-merge/dist/lib/tw-merge.mjs");function cn(){for(var _len=arguments.length,inputs=new Array(_len),_key=0;_key<_len;_key++)inputs[_key]=arguments[_key];return(0,tailwind_merge__WEBPACK_IMPORTED_MODULE_0__.m)((0,clsx__WEBPACK_IMPORTED_MODULE_1__.W)(inputs))}}}]);