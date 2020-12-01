<?php
	defined('BASEPATH') OR exit('No direct script access allowed');
	?>

	<?php if ($stateTheme == 'light') { ?>
        <div class="preloader"></div>
    <?php } else { ?>
        <div class="preloaderDark"></div>
    <?php } ?>
	<main class="page-content pt-2">
	    <div class="container-fluid p-5">
	        <div class="row noselect">
	            <div class="form-group col-md-12">
					<div id="doc-id">
						<h4 class="text-muted mb-4">test page</h4>
                        <div class="row mb-4">
							<div class="col-md-12">
								<div class="card border-0 rounded-0">
                                    <div class="card-body">
                                       <?php echo $error?>
	                                </div>
                                </div>
                            </div>
                        </div>
					</div>
                </div>
	        </div>
	    </div>
	</main>




    