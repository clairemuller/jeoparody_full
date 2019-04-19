#
# ###### SEEDING FROM API - TOOK TWO HOURS #######
#
# def create_clue(clue)
#   if !Clue.find_by(question: clue["question"])
#     newCat = Category.find_or_create_by({
#       title: clue["category"]["title"]
#       })
#       Clue.create({
#         question: clue["question"],
#         answer: clue["answer"],
#         category_id: newCat.id
#         })
#   end
# end
#
# Category.destroy_all
# Clue.destroy_all
#
# offsetNum = 0;
# while offsetNum <= 156800 do
#   url = 'http://jservice.io/api/clues?offset=' + offsetNum.to_s + '?count=100'
#   response_string = RestClient.get(url)
#   clues = JSON.parse(response_string)
#
#   clues.each do |clue|
#     # makes sure no field is empty
#     if clue.key?("question") && clue.key?("answer") && clue.key?("category")
#       if !clue["question"].empty? && !clue["answer"].empty? && !clue["category"]["title"].empty?
#         create_clue(clue)
#       end
#     end
#   end
#   offsetNum += 100;
# end
