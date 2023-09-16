<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

$form = ActiveForm::begin([
    'action' => ['site/create'],
]);?>

<?= $form->field($product, 'name')->textInput(['maxlength' => true]) ?>

<?= $form->field($product, 'description')->textarea(['rows' => 6]) ?>

<?= $form->field($product, 'price')->textInput() ?>

<div class="form-group">
    <?= Html::submitButton('Save', ['class' => 'btn btn-success']) ?>
</div>

<?php ActiveForm::end(); ?>