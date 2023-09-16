<?php

use yii\helpers\Html;

$this->title = 'Products';
$this->params['breadcrumbs'][] = $this->title;
?>

<h1><?= Html::encode($this->title) ?></h1>

<p>
    <?= Html::a('Create Product', ['create'], ['class' => 'btn btn-success']) ?>
</p>

<table class="table">
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Description</th>
        <th>Price</th>
        <th>Action</th>
    </tr>
    <?php foreach ($products as $product) : ?>
        <tr>
            <td><?= Html::encode($product->id) ?></td>
            <td><?= Html::encode($product->name) ?></td>
            <td><?= Html::encode($product->description) ?></td>
            <td><?= Html::encode($product->price) ?></td>
            <td>
                <?= Html::a('Delete', ['delete', 'id' => $product->id], ['class' => 'btn btn-danger']) ?>
            </td>
        </tr>
    <?php endforeach; ?>
</table>