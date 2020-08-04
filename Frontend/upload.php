<?php
	$uploaddir = '/var/www/html/limb/images/';
	echo $_FILES['userfile']['type'];
	if (move_uploaded_file($_FILES['userfile']['tmp_name'], $uploaddir.$_REQUEST['link'])) {
	    echo "Файл корректен и был успешно загружен.\n";
	} else {
	    echo "Возможная атака с помощью файловой загрузки!\n";
	}

	echo 'Некоторая отладочная информация:';
	print_r($_FILES);

	print "</pre>";

?>