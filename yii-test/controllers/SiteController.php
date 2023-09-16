<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use app\models\Product;

class SiteController extends Controller
{
    public function actionIndex()
    {
        $products = Product::find()->all();
        return $this->render('index', ['products' => $products]);
    }

    public function actionCreate()
    {
        $product = new Product();

        if ($product->load(Yii::$app->request->post()) && $product->save()) {
            return $this->redirect(['index']);
        }

        return $this->render('create', ['product' => $product]);
    }

    public function actionDelete($id)
    {
        $product = Product::findOne($id);

        if ($product) {
            $product->delete();
        }

        return $this->redirect(['index']);
    }
}