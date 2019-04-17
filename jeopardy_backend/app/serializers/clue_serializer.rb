class ClueSerializer < ActiveModel::Serializer
  attributes :id, :question, :answer

  belongs_to :category
end
