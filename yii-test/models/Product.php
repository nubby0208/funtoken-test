<?php
namespace app\models;
use yii\db\ActiveRecord;
class Product extends ActiveRecord
{
    public static function tableName()
    {
        return 'products';
    }

    public function rules()
    {
        return [
            [['name', 'description', 'price'], 'required'],
            [['name', 'description'], 'string'],
            [['price'], 'number'],
        ];
    }
}
?>