const tpl = `
<div class="room">
	<div class="title">{{title}}</div>
	<div class="lamp {{status}}"></div>
	{{#if button}}
 		<button>Toggle!</button>
	{{/if}}
</div>
`;

export default tpl;