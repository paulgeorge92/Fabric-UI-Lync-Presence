# Fabric-UI-Lync-Presence
Bring Lync Presence and status text in HTML pages
## Installation
1. Download the files.
2. Load the fabric.min.css and fabric.components.min.css
3. Load the lync.css
4. Load lync.min.js

## Usage
Use the following HTML markup to bring the Lync Presence. 

&lt;div class="lync-status" data-sip="sip_address" data-name="Name_of_the_User" data-title="title" data-image="image_url""&gt;&lt;/div&gt;

&lt;div class="facepile" data-sip="sip_address" data-name="Name_of_the_User" data-image="image_url""&gt;&lt;/div&gt;

Initiate the lync presence in script `lync.init();`  

You don't need to call the init() twice for lync status and face pile! The function will take care of that.  

You can pass certain properties for   

`
	visible: number_of_faces_to_be_displayed_in_facepile,

	moreFace: function_call_back_on_click_of_more 
`

## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License
MIT LICENSE